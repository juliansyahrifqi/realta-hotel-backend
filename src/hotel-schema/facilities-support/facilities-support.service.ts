import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { facilities_support } from 'models/hotelSchema';
import { CreateFacilitiesSupportDto } from './dto/create-facilities-support.dto';
import { UpdateFacilitiesSupportDto } from './dto/update-facilities-support.dto';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class FacilitiesSupportService {
  constructor(
    @InjectModel(facilities_support)
    private faciSupModel: typeof facilities_support,
  ) {}

  async create(
    @Res() response: Response,
    createFacilitiesSupportDto: CreateFacilitiesSupportDto,
    icons: Express.Multer.File,
  ) {
    try {
      // Penamaan untuk URL
      let finalURL = `http://localhost:${process.env.PORT}/facilities-support/icons/${icons.filename}`;

      const data = await this.faciSupModel.create({
        fs_name: createFacilitiesSupportDto.fs_name,
        fs_description: createFacilitiesSupportDto.fs_description,
        fs_icon: icons.filename,
        fs_icon_url: finalURL,
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
      const data = await this.faciSupModel.findAll({
        order: [['fs_id', 'ASC']],
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

  async findOne(@Res() response: Response, id: number) {
    try {
      const data = await this.faciSupModel.findOne({
        where: { fs_id: id },
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
    updateFacilitiesSupportDto: UpdateFacilitiesSupportDto,
    icons: Express.Multer.File,
  ) {
    try {
      // Penamaan untuk URL
      let finalURL = `http://localhost:${process.env.PORT}/facilities-support/icons/${icons.filename}`;

      const data = await this.faciSupModel.update(
        {
          fs_name: updateFacilitiesSupportDto.fs_name,
          fs_description: updateFacilitiesSupportDto.fs_description,
          fs_icon: icons.filename,
          fs_icon_url: finalURL,
        },
        {
          where: { fs_id: id },
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
      const facilitySupport = await this.faciSupModel.findOne({
        where: { fs_id: id },
      });

      let split = facilitySupport.fs_icon_url.split('/');
      console.log(split);
      let filepath = `uploads/icons/hotel/${split[5]}`;
      console.log(filepath);

      fs.unlink(filepath, async (err) => {
        if (err) {
          console.log(err);
        }
        console.log('deleted');
      });

      // const photosURL = facilities;
      // let filePath = `${path.resolve(
      //   __dirname,
      //   `../../../../uploads/image/hotel/${photosURL}`,
      // )}`;
      // fs.unlink(filePath, async (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log('deleted');
      // });

      const data = await this.faciSupModel.destroy({
        where: { fs_id: id },
      });
      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Data dengan id-${id} Berhasil Di Hapus`,
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
