import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService,) { }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  async findAllHotel(
    @Query('page') page = 1,
    @Query('limit') limit = 2,
    @Query('minSubTotal') minSubTotal = 0,
    @Query('maxSubTotal') maxSubTotal = Number.MAX_VALUE,
    @Query('cityName') cityName: string,
    @Query('provName') provName: string,
    @Query('countryName') countryName: string,
    @Query('regionName') regionName: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('facilities_support_filter') facilities_support_filter: string,
    @Res() response: Response,
  ) {
    try {
      let facilitiesSupportFilter: any;
      if (facilities_support_filter !== undefined) {
        facilitiesSupportFilter = facilities_support_filter.split(", ").map(str => str.replace(/[\[\]']+/g, ''))
      }
      const { data, totalData } = await this.bookingService.findBookingAllHotel(
        page,
        limit,
        cityName,
        provName,
        countryName,
        regionName,
        facilitiesSupportFilter
      );

      let dataResFinal = data.map((data: any) => {
        let priceRate = 0;
        if (data.faci_rate_price.length > 0) {
          priceRate = parseInt(data.faci_rate_price.replace(/[^0-9.-]+/g, ''));

        }
        let priceDiscount = priceRate - (data.faci_discount * priceRate)
        let priceTax = priceDiscount + (data.faci_tax_rate * priceDiscount)
        let subTotal = priceTax


        const rpSubTotal = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(subTotal);

        let dataObj = {
          ...data,
          faci_subtotal: rpSubTotal,

        };
        delete dataObj.parent;

        return dataObj;
      }).filter((data: any) => {
        const faciSubtotalNumber = Number(data.faci_subtotal.replace(/[^0-9.-]+/g, ''));
        return faciSubtotalNumber >= Number(minSubTotal) && faciSubtotalNumber <= Number(maxSubTotal);
      });

      let formattedDateStart: string;
      let formattedDateEnd: string;
      if (startDate && endDate) {
        dataResFinal = dataResFinal.filter((e: any) => {
          const faciStartDate = new Date(e.faci_startdate);
          const faciLastDate = new Date(e.faci_enddate);

          formattedDateStart = faciStartDate.toISOString().substring(0, 10);
          formattedDateEnd = faciLastDate.toISOString().substring(0, 10);

          return formattedDateStart >= startDate && formattedDateEnd <= endDate;
        });
      }

      if (!dataResFinal) {
        const dataResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'gagal',
          data: dataResFinal,
        };
        return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
      } else {
        const dataResponse = {
          statusCode: HttpStatus.OK,
          message: 'success',
          data: dataResFinal,
          checkin: formattedDateStart,
          checkout: formattedDateEnd,
          page,
          limit,
          total: totalData,
        };
        return response.status(HttpStatus.OK).send(dataResponse);
      }
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }

  @Get('uploads/:ImgId')
  async findFaciPhoto(@Param('ImgId') path: string, @Res() res: any) {
    res.set('Content-Type', 'image/png');
    return res.sendFile(path, { root: 'public/uploads/image/hotel' });
  }
  @Get('hotel/:IdHotel/room/:IdFaci')
  async detailBookRoom(@Param('IdFaci') IdFaci: string, @Param('IdHotel') IdHotel: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string, @Query('dataRooms') dataRooms: string, @Query('guestRooms') guestRooms: string, @Res() res: Response) {
    let dataIdFilter: any;
    let dataGuestRooms: any;
    if (dataRooms !== undefined && guestRooms !== undefined) {
      dataIdFilter = dataRooms.split(", ").map(str => Number(str.replace(/[\[\]']+/g, '')))
      dataGuestRooms = guestRooms.split(", ").map(str => Number(str.replace(/[\[\]']+/g, '')))
    } else {
      dataIdFilter = [Number(IdFaci)]
      dataGuestRooms = [2]
    }
    try {
      const { data, jumlahData } = await this.bookingService.findFaciById(IdHotel, dataIdFilter, startDate, endDate)
      let jumlahTotalPrice = 0;
      data.forEach((item: any) => {
        let priceRate = 0
        priceRate = parseFloat(item.faci_subtotal.replace(/[^\d\,]+/g, '').replace(',', '.'));
        jumlahTotalPrice = jumlahTotalPrice + priceRate;
      });
      const RpJumlahTotalPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(jumlahTotalPrice);
      let dataGuestAll = 0
      data.forEach((itemHotel: any, index) => {
        if (dataGuestRooms[index] > itemHotel.faci_max_number) {
          throw `Ruangan bernomor ${itemHotel.faci_room_number} bertipe ${itemHotel.faci_name} tidak digunakan lebih dari ${itemHotel.faci_max_number} orang`
        } else {
          dataGuestAll += dataGuestRooms[index]
        }
      })
      return res.status(200).json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: {
          data_rooms: data,
          total_price: RpJumlahTotalPrice,
          totalGuest: dataGuestAll,
          totalRoomsBook: dataIdFilter.length
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: error,
      });
    }

  }

  @Get('hotel/:IdHotel/room/:IdRoom/:SeriesRoom')
  async getAllListSameRoom(@Param('IdHotel') IdHotel: string, @Param('IdRoom') IdRoom: string, @Param('SeriesRoom') SeriesRoom: string, @Res() res: Response) {
    try {
      console.log(IdHotel, IdRoom, SeriesRoom)
      const dataListRoom = await this.bookingService.getAllListSameRoom(Number(IdHotel), Number(IdRoom), SeriesRoom)
      return res.status(200).json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: dataListRoom
      })
    } catch (error) {
      return res.status(400).json({
        status_code: HttpStatus.OK,
        message: error
      })
    }
  }

  @Get('hotel/:IdHotel/room/')
  async getListRooms(@Param('IdHotel') IdHotel: string, @Query('NotRoomName') NotRoomName: string, @Query('IdCagro') IdCagro: string, @Res() res: Response) {
    try {
      const dataResponse = await this.bookingService.findAllRoomsByCateAndHotel(IdHotel, NotRoomName, IdCagro)
      return res.status(200).json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: dataResponse
      })
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'failed',
      });
    }
  }

  @Post('hotel/rooms/order_booking/')
  async temporaryBooking(@Body() dataOrder: any, @Res() res: Response) {

    try {
      const dataResponse = await this.bookingService.createTemporaryBooking(dataOrder)

      return res.status(200).json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: dataResponse
      })

    } catch (error) {
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: error
      })
    }
  }

  @Get('hotel/rooms/order_booking_final/:IdOrderDetail/:IdUser')
  async getFinalBooking(@Param('IdOrderDetail') IdOrderDetail: string, @Param('IdUser') IdUser: string, @Query('CheckIn') CheckIn: string, @Query('CheckOut') CheckOut: string, @Query('TotalGuest') TotalGuest: string, @Query('TotalRooms') TotalRooms: string, @Res() res: Response) {
    try {
      console.log(IdOrderDetail)
      const { dataRes, dataCache } = await this.bookingService.getfinalBookingRooms(Number(IdOrderDetail), Number(IdUser), CheckIn, CheckOut, Number(TotalGuest), Number(TotalRooms))

      return res.status(200).json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: dataRes,
        data_proses: dataCache
      })
    } catch (error) {
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: error
      })
    }
  }

  @Get('hotel/rooms/coupons/:IdBoor')
  async getAllSpecialOffer(@Res() res: Response, @Param('IdBoor') IdBoor: string) {
    try {

      const dataRes = await this.bookingService.getAllSpecialOffer(IdBoor)

      return res.status(200).json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: dataRes
      })
    } catch (error) {
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: error
      })
    }
  }

  @Post('hotel/rooms/coupons/')
  async pickSpecialOffer(@Body() pick: any, @Query('IdUser') IdUser: string, @Query('TotalGuest') TotalGuest: string, @Query('TotalRooms') TotalRooms: string, @Res() res: Response) {
    try {
      const dataResponse = await this.bookingService.pickSpecialOfferFinal(pick, IdUser, Number(TotalGuest), Number(TotalRooms))

      return res.status(200).json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: dataResponse
      })
    } catch (error) {
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: error
      })
    }
  }

  @Post('hotel/rooms/extra/')
  async pickExtraItemsBuy(@Body() pick: any, @Query('IdUser') IdUser: string, @Query('TotalGuest') TotalGuest: string, @Query('TotalRooms') TotalRooms: string, @Res() res: Response) {
    try {
      const dataResponse = await this.bookingService.pickExtraItemsBuyFinal(pick, IdUser, Number(TotalGuest), Number(TotalRooms))
      return res.status(200).json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: dataResponse
      })
    } catch (error) {
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: error
      })
    }
  }
}
