import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  facilities,
  facilities_support,
  facility_photos,
  hotels,
} from 'models/hotelSchema';
import * as path from 'path';
import { CreateFacilityPhotoDto } from './dto/create-facility-photo.dto';
import { UpdateFacilityPhotoDto } from './dto/update-facility-photo.dto';
import * as fs from 'fs';
import { Response } from 'express';

@Injectable()
export class FacilityPhotoService {
  constructor(
    @InjectModel(facility_photos)
    private faphoModel = facility_photos,
  ) {}
  async create(
    @Res() response: Response,
    createFacilityPhotoDto: CreateFacilityPhotoDto,
    photos: Express.Multer.File,
  ) {
    try {
      // Penamaan untuk Thumbnail
      let thumbnailName = `faci${createFacilityPhotoDto.fapho_faci_id}_${
        path.parse(photos.originalname).name
      }`;
      // Penamaan untuk URL
      let finalURL = `http://localhost:${process.env.PORT}/facility-photos/photos/${photos.filename}`;

      const data = await this.faphoModel.create({
        fapho_faci_id: createFacilityPhotoDto.fapho_faci_id,
        fapho_thumbnail_filename: thumbnailName,
        fapho_photo_filename: photos.filename,
        fapho_primary: createFacilityPhotoDto.fapho_primary,
        fapho_url: finalURL,
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
      const data = await this.faphoModel.findAll();
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
      const data = await this.faphoModel.findOne({
        where: { fapho_id: id },
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
    updateFacilityPhotoDto: UpdateFacilityPhotoDto,
    photos: Express.Multer.File,
  ) {
    try {
      const idData = await this.faphoModel.findOne({
        where: { fapho_id: id },
      });

      let filePath = `${path.resolve(
        __dirname,
        `../../../../uploads/image/hotel/${idData.fapho_photo_filename}`,
      )}`;
      // console.log(filePath);
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.log(err);
        }
        console.log('berhasil hapus foto');

        // Penamaan untuk Thumbnail
        let thumbnailName = `faci${updateFacilityPhotoDto.fapho_faci_id}_${photos.originalname}`;
        // Penamaan untuk URL
        let finalURL = `http://localhost:${process.env.PORT}/facility-photos/photos/${photos.filename}`;

        const data = await this.faphoModel.update(
          {
            fapho_faci_id: updateFacilityPhotoDto.fapho_faci_id,
            fapho_thumbnail_filename: thumbnailName,
            fapho_photo_filename: photos.filename,
            fapho_primary: updateFacilityPhotoDto.fapho_primary,
            fapho_url: finalURL,
          },
          {
            where: { fapho_id: id },
          },
        );
      });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        mmessage: `Data dengan id-${id} Berhasil Di Perbarui`,
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
      const idData = await this.faphoModel.findOne({
        where: { fapho_id: id },
      });

      let filePath = `${path.resolve(
        __dirname,
        `../../../../uploads/image/hotel/${idData.fapho_photo_filename}`,
      )}`;

      fs.unlink(filePath, async (err) => {
        if (err) {
          console.log(err);
        }
        console.log('deleted');
      });

      const data = await this.faphoModel.destroy({
        where: { fapho_id: id },
      });
      const dataResponse = {
        statusCode: HttpStatus.OK,
        mmessage: `Data dengan id-${id} Berhasil Di Hapus`,
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
