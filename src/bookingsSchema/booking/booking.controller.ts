import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
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
    @Query('limit') limit = 3,
    @Query('minSubTotal') minSubTotal = 0,
    @Query('maxSubTotal') maxSubTotal = Number.MAX_VALUE,
    @Query('cityName') cityName: string = 'Jakarta',
    @Query('provName') provName: string,
    @Query('countryName') countryName: string,
    @Query('regionName') regionName = 'Asia',
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('facilities_support_filter') facilities_support_filter: string,
    @Res() response: Response,
  ) {
    try {
      console.log(typeof startDate, '', typeof endDate)
      let facilitiesSupportFilter: any;
      if (facilities_support_filter !== undefined) {
        facilitiesSupportFilter = facilities_support_filter.split(", ").map(str => str.replace(/[\[\]']+/g, ''))
      }
      const { dataNew, totalData } = await this.bookingService.findBookingAllHotel(
        page,
        limit,
        cityName,
        provName,
        countryName,
        regionName,
        facilitiesSupportFilter
      );

      let dataResFinal = dataNew.map((data: any) => {
        let priceRate = 0;
        if (data.faci_rate_price.length > 0) {
          priceRate = parseInt(data.faci_rate_price.replace(/[^0-9.-]+/g, ''));

        }
        // Hitung selisih hari antara startDate dan endDate
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

        let priceDiscount = priceRate - data.faci_discount * priceRate;
        let subTotal = priceDiscount + data.faci_tax_rate * priceDiscount;

        subTotal *= diff;
        let faci_rate_price_converse = parseInt(data.faci_rate_price.replace(/[^0-9.-]+/g, '')) * diff
        const rpSubTotal = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(subTotal);

        const rpFaciRatePrice = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(faci_rate_price_converse);

        // let priceDiscount = priceRate - (data.faci_discount * priceRate)
        // let priceTax = priceDiscount + (data.faci_tax_rate * priceDiscount)
        // let subTotal = priceTax



        // const rpSubTotal = new Intl.NumberFormat('id-ID', {
        //   style: 'currency',
        //   currency: 'IDR',
        // }).format(subTotal);

        let dataObj = {
          ...data,
          faci_rate_price: faci_rate_price_converse,
          faci_subtotal: subTotal,

        };
        delete dataObj.parent;
        return dataObj;
      }).filter((data: any) => {
        const faciSubtotalNumber = data.faci_subtotal;
        console.log(faciSubtotalNumber >= Number(minSubTotal) && faciSubtotalNumber <= Number(maxSubTotal))
        return faciSubtotalNumber >= Number(minSubTotal) && faciSubtotalNumber <= Number(maxSubTotal);
      });;


      // let formattedDateStart: string;
      // let formattedDateEnd: string;
      // if (startDate && endDate) {
      //   dataResFinal = dataResFinal.filter((e: any) => {
      //     const faciStartDate = new Date(e.faci_startdate);
      //     const faciEndDate = new Date(e.faci_enddate);

      //     formattedDateStart = faciStartDate.toISOString().substring(0, 10);
      //     formattedDateEnd = faciEndDate.toISOString().substring(0, 10);

      //     const startFilterDate = new Date(startDate);
      //     const endFilterDate = new Date(endDate);

      //     return faciStartDate >= startFilterDate && faciEndDate <= endFilterDate;
      //   });
      // }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      console.log(`Halaman start Index ${startIndex} dan Halaman End Index ${endIndex}`)

      dataResFinal = dataResFinal.slice(startIndex, endIndex);


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
          checkIn: startDate,
          checkOut: endDate,
          page,
          limit,
          total: dataResFinal.length,
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
      let priceRateReal = 0
      data.forEach((item: any) => {
        let priceRate = 0
        priceRate = parseFloat(item.faci_subtotal.replace(/[^\d\,]+/g, '').replace(',', '.'));
        let priceRateRealConverse = parseFloat(item.faci_rate_price.replace(/[^\d\,]+/g, '').replace(',', '.'));
        jumlahTotalPrice = jumlahTotalPrice + priceRate;
        priceRateReal = priceRateReal + priceRateRealConverse
      });
      const RpJumlahTotalPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(jumlahTotalPrice);

      const RpJumlahTotalPriceRateReal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(priceRateReal);

      let dataGuestAll = 0
      data.forEach((itemHotel: any, index: any) => {
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
          total_price_real: RpJumlahTotalPriceRateReal,
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
      // const dataResponse = dataOrder
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
      console.log(IdBoor)
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
        data: [...dataResponse]
      })
    } catch (error) {
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: error
      })
    }
  }

  @Get('price-items/')
  async getExtraItemsBooking(@Res() res: Response) {
    try {
      const dataResponse = await this.bookingService.getAllExtraItemsBooking()
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

  @Post('hotel/breakfeast/:BordeId')
  async createBreakFeast(@Param('BordeId') BoorId: any, @Body() pick: any, @Res() res: Response) {
    try {
      const dataResponse = await this.bookingService.createBreakFeastBooking(BoorId, pick)
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

  @Put('booking_orders_detail/:IdBorde')
  async createFinalBookingOrderDetails(@Param('IdBorde') IdBorde: any,
    @Body() pick: any, @Query(`Borde_Id_All`) Borde_Id_All: any, @Res() res: Response) {
    try {
      let bordeAll = Borde_Id_All.split(", ").map((str: any) => Number(str.replace(/[\[\]']+/g, '')))
      const dataResponse = await this.bookingService.createFinalBookingOrderDetail(IdBorde, pick, bordeAll)
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

  @Put('booking_orders/:IdBookingOrder')
  async createBookingOrder(@Param('IdBookingOrder') IdBookingOrder: any, @Body() pick: any, @Res() res: Response) {
    try {
      const dataResponse = await this.bookingService.createBookingOrderFinal(pick, IdBookingOrder)
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

  @Put(`user_points`)
  async updateUserMemberPointsBooking(@Query('UserMemberId') UserMemberId: any, @Query('UserMemberName') UserMemberName: any, @Body() pick: any, @Res() res: Response) {
    try {
      console.log(UserMemberId, UserMemberName, pick)
      const dataResponse = await this.bookingService.updateUserMemberPointsBooking(Number(UserMemberId), UserMemberName, pick)
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
