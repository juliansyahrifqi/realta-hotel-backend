import { Injectable, UploadedFile } from '@nestjs/common';
import { CreateStockPhotoDto } from './dto/create-stock-photo.dto';
import { UpdateStockPhotoDto } from './dto/update-stock-photo.dto';
import { stock_photo } from 'models/purchasingSchema';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class StockPhotoService {
  async create(
    createStockPhotoDto: CreateStockPhotoDto,
    foto: Express.Multer.File[],
  ) {
    try {
      const data = [];
      for (let i = 0; i < foto.length; i++) {
        const photoStock = await stock_photo.create({
          spho_thumbnail_filename: createStockPhotoDto.spho_thumbnail_filename,
          spho_photo_filename: foto[i].filename,
          spho_primary: createStockPhotoDto.spho_primary,
          spho_url: `http://localhost:${process.env.PORT}/uploads/image/stock/${foto[i].filename}`,
          spho_stock_id: createStockPhotoDto.spho_stock_id,
        });
        data.push(photoStock);
      }
      return { message: `Data berhasil di tambahkan`, data };
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await stock_photo.findAll();
      return { message: `Data di temukan`, data: result };
    } catch (error) {
      return error;
    }
  }

  async findOne(spho_id: number): Promise<any> {
    try {
      const result = await stock_photo.findOne({ where: { spho_id } });
      if (result) {
        return {
          message: `Data dengan id ${spho_id} berhasil ditemukan`,
          data: result,
        };
      } else {
        return {
          message: `Data dengan id ${spho_id} tidak ditemukan`,
          data: result,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async update(
    spho_id: number,
    updateStockPhotoDto: UpdateStockPhotoDto,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    try {
      const result = await stock_photo.findOne({ where: { spho_id } });
      const imageUrl = result.spho_photo_filename;
      const imageFileName = imageUrl.split('/').pop();
      const imagePath = join(
        __dirname,
        '../../../../uploads/image/stock',
        imageFileName,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        await stock_photo.destroy({ where: { spho_id } });
      }
      return `Data dengan id ${spho_id} terhapus`;
    } catch (error) {
      return error.message;
    }
  }

  async remove(spho_id: number): Promise<any> {
    try {
      const result = await stock_photo.findOne({ where: { spho_id } });
      if (!result) {
        return `Data dengan id ${spho_id} tidak di temukan`;
      }
      const uploadPath = join(__dirname, '../../../../uploads/image/stock');
      const files = await fs.promises.readdir(uploadPath);

      for (const file of files) {
        const filePath = join(uploadPath, file);
        await fs.promises.unlink(filePath);
      }
      return `Data dengan id ${spho_id} terhapus`;
    } catch (error) {
      return error.message;
    }
  }
}
