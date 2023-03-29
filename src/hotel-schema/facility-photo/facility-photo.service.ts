import { Injectable } from '@nestjs/common';
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

@Injectable()
export class FacilityPhotoService {
  constructor(
    @InjectModel(facility_photos)
    private faphoModel = facility_photos,
  ) {}
  async create(
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

      return data;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const data = await this.faphoModel.findAll();
      return data;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.faphoModel.findOne({
        where: { fapho_id: id },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async update(
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
        `../../../../Upload/image/hotelSchema/${idData.fapho_photo_filename}`,
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
        return data;
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const idData = await this.faphoModel.findOne({
        where: { fapho_id: id },
      });

      let filePath = `${path.resolve(
        __dirname,
        `../../../../Upload/image/hotelSchema/${idData.fapho_photo_filename}`,
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
      return `Data dengan id${id} Berhasil Di Hapus`;
    } catch (error) {
      return error;
    }
  }
}
