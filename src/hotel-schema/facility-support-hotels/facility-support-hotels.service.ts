import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { facility_support_hotels } from 'models/hotelSchema';
import { CreateFacilitySupportHotelDto } from './dto/create-facility-support-hotel.dto';
import { UpdateFacilitySupportHotelDto } from './dto/update-facility-support-hotel.dto';

@Injectable()
export class FacilitySupportHotelsService {
  constructor(
    @InjectModel(facility_support_hotels)
    private fashoModel = facility_support_hotels,
  ) {}
  async create(
    @Res() response: Response,
    createFacilitySupportHotelDto: CreateFacilitySupportHotelDto,
  ) {
    try {
      const data = await this.fashoModel.create({
        fsh_hotel_id: createFacilitySupportHotelDto.fsh_hotel_id,
        fsh_fs_id: createFacilitySupportHotelDto.fsh_fs_id,
      });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: 'Berhasil Di Tambahkan',
        data: data,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async findAll(@Res() response: Response) {
    try {
      const data = await this.fashoModel.findAll();

      const dataResponse = {
        statusCode: HttpStatus.OK,
        data: data,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async findOne(@Res() response: Response, id: number) {
    try {
      const data = await this.fashoModel.findOne({
        where: { fsh_id: id },
      });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        data: data,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async update(
    @Res() response: Response,
    id: number,
    updateFacilitySupportHotelDto: UpdateFacilitySupportHotelDto,
  ) {
    try {
      const data = await this.fashoModel.update(
        {
          fsh_hotel_id: updateFacilitySupportHotelDto.fsh_hotel_id,
          fsh_fs_id: updateFacilitySupportHotelDto.fsh_fs_id,
        },
        {
          where: { fsh_id: id },
        },
      );

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Data dengan id-${id} Berhasil Di Perbarui`,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async remove(@Res() response: Response, id: number) {
    try {
      const data = await this.fashoModel.destroy({
        where: { fsh_id: id },
      });
      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Data dengan id-${id} Berhasil Di Perbarui`,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }
}
