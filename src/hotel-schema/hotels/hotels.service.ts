import { HttpStatus, Injectable, Param, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { response, Response } from 'express';
import {
  facilities,
  facilities_support,
  hotels,
  hotel_reviews,
  facility_photos,
  facility_price_history,
} from 'models/hotelSchema';
import { address, category_group, city } from 'models/masterSchema';
import { Op, Sequelize } from 'sequelize';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(hotels)
    private hotelsModel: typeof hotels,
    @InjectModel(facilities)
    private faciModel: typeof facilities,
    @InjectModel(address)
    private addressModel: typeof address,
    @InjectModel(city)
    private cityModel: typeof city,
  ) {}

  async create(
    @Res() response: Response,
    createHotelDto: CreateHotelDto,
    city_name: string,
  ) {
    try {
      const dataCity = await this.cityModel
        .findOne({
          where: { city_name: city_name },
        })
        .then((data) => {
          return this.addressModel.create({
            addr_city_id: data.city_id,
            addr_line1: createHotelDto.addr_line1,
            addr_line2: createHotelDto.addr_line2,
            addr_postal_code: createHotelDto.addr_postal_code,
          });
        })
        .then((data) => {
          return this.hotelsModel.create({
            hotel_name: createHotelDto.hotel_name,
            hotel_phonenumber: createHotelDto.hotel_phonenumber,
            hotel_status: createHotelDto.hotel_status,
            hotel_addr_id: data.addr_id,
            hotel_description: createHotelDto.hotel_description,
          });
        });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: 'Berhasil Di Tambahkan',
        data: dataCity,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error, ${error}`,
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async findAll(
    @Res() response: Response,
    pageNumber: number,
    pageSize: number,
    hotel_name: string,
  ) {
    try {
      const pages = pageNumber || 0;
      const limits = pageSize || 5;
      const search = hotel_name || '';
      const offset = limits * (pages - 1);

      const totalRows = await this.hotelsModel.count({
        where: {
          [Op.or]: [
            {
              hotel_name: {
                [Op.iLike]: '%' + search + '%',
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);

      const data = await this.hotelsModel.findAll({
        where: {
          hotel_name: {
            [Op.iLike]: '%' + search + '%',
          },
        },
        include: [
          { model: address, include: [{ model: city }] },
          {
            model: facilities,
            include: [
              { model: category_group },
              { model: facility_photos },
              { model: facility_price_history },
            ],
          },
          { model: facilities_support },
        ],
        offset: offset,
        limit: limits,
        order: [['hotel_id', 'ASC']],
      });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        totalPage: totalPage,
        totalRows: totalRows,
        page: pages,
        data: data,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error,
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async findAllSearch(@Res() response: Response, searchQuery: string) {
    try {
      const data = await this.hotelsModel.findAll({
        include: [
          { model: address },
          { model: facilities, include: [{ model: category_group }] },
        ],
        where: {
          hotel_name: { [Op.iLike]: `%${searchQuery}%` },
        },
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

  async findAllIncludeReviews(
    @Res() response: Response,
    pageNumber: number,
    pageSize: number,
  ) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      const data = await this.hotelsModel.findAll({
        include: [{ model: hotel_reviews }],
        offset,
        limit,
      });
      const dataResponse = {
        statusCode: HttpStatus.OK,
        page: offset + 1,
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

  async findAllIncludeRoom(
    @Res() response: Response,
    pageNumber = 1,
    pageSize = 10,
  ) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      const data = await this.hotelsModel.findAll({
        include: [{ model: facilities, include: [{ model: category_group }] }],
        offset,
        limit,
      });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        page: offset + 1,
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

  async findAllIncludeAddress(
    @Res() response: Response,
    pageNumber = 1,
    pageSize = 10,
  ) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      const data = await this.hotelsModel.findAll({
        include: [
          {
            model: address,
            include: [{ model: city }],
          },
        ],
        offset,
        limit,
      });
      const dataResponse = {
        statusCode: HttpStatus.OK,
        page: offset + 1,
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

  async findAllIncludeSupport(@Res() response: Response, hotel_id: number) {
    try {
      const data = await this.hotelsModel.findAll({
        where: { hotel_id: hotel_id },
        include: [
          {
            model: facilities_support,
          },
        ],
      });
      const dataResponse = {
        statusCode: HttpStatus.OK,
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

  findOne(id: number) {
    const data = this.hotelsModel.findOne({
      where: { hotel_id: id },
      include: [
        {
          model: facilities,
          include: [
            { model: facility_photos },
            { model: facility_price_history },
          ],
        },
      ],
    });

    return data;
  }

  async update(
    @Res() response: Response,
    hotel_id: number,
    city_name: string,
    updateHotelDto: UpdateHotelDto,
  ) {
    try {
      const dataHotel = await this.hotelsModel
        .update(
          {
            hotel_name: updateHotelDto.hotel_name,
            hotel_phonenumber: updateHotelDto.hotel_phonenumber,
            hotel_status: updateHotelDto.hotel_status,
            hotel_description: updateHotelDto.hotel_description,
            hotel_modified_date: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          {
            where: { hotel_id: hotel_id },
          },
        )
        .then((data) => {
          return this.addressModel.update(
            {
              addr_line1: updateHotelDto.addr_line1,
              addr_line2: updateHotelDto.addr_line2,
              addr_postal_code: updateHotelDto.addr_postal_code,
            },
            {
              where: { addr_id: hotel_id },
            },
          );
        });

      const dataCity = await this.cityModel
        .findOne({
          where: { city_name: city_name },
        })
        .then((data) => {
          return this.addressModel.update(
            {
              addr_city_id: data.city_id,
            },
            { where: { addr_id: hotel_id } },
          );
        });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Data dengan id-${hotel_id} Berhasil Di Perbarui`,
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

  async updateStatus(
    @Res() response: Response,
    hotel_id: number,
    updateHotelDto: UpdateHotelDto,
  ) {
    try {
      const data = await this.hotelsModel.update(
        {
          hotel_status: updateHotelDto.hotel_status,
          hotel_reason: updateHotelDto.hotel_reason,
        },
        { where: { hotel_id: hotel_id } },
      );

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Status Berhasil Di Perbarui`,
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

  async remove(@Res() response: Response, @Param('id') id: number) {
    try {
      // const facilities = await this.faciModel.findAll({
      //   where: { faci_hotel_id: id },
      //   include: [{ model: facility_photos }],
      // });

      // if (facilities.facility_photos.length) {
      //   for (const photos of facilities.facility_photos) {
      //     const photosURL = photos.fapho_photo_filename;
      //     let filePath = `${path.resolve(
      //       __dirname,
      //       `../../../../uploads/image/hotel/${photosURL}`,
      //     )}`;
      //     fs.unlink(filePath, async (err) => {
      //       if (err) {
      //         console.log(err);
      //       }
      //       console.log('deleted');
      //     });

      //     await this.faciModel.destroy({
      //       where: { faci_id: id },
      //     });
      //   }
      // }

      // const hapus = await this.hotelsModel.destroy({
      //   where: { hotel_id: id },
      // });

      const facilities = await this.faciModel.findAll({
        where: { faci_hotel_id: id },
        include: [{ model: facility_photos }],
      });

      for (const facility of facilities) {
        const facilityPhotos = facility.facility_photos;
        for (const photo of facilityPhotos) {
          const photoPath = path.resolve(
            __dirname,
            `../../../../uploads/image/hotel/${photo.fapho_photo_filename}`,
          );
          fs.unlink(photoPath, (err) => {
            if (err) {
              console.log(err);
            }
            console.log('File deleted:', photoPath);
          });
          await photo.destroy();
        }
        await facility.destroy();
      }

      await this.hotelsModel.destroy({
        where: { hotel_id: id },
      });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Data dengan id-${id} Berhasil Di Hapus`,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error,
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }
}
