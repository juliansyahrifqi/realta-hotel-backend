import { HttpStatus, Injectable, Res, UploadedFile } from '@nestjs/common';
import { CreateStockPhotoDto } from './dto/create-stock-photo.dto';
import { UpdateStockPhotoDto } from './dto/update-stock-photo.dto';
import { stock_photo, stocks, vendor_product } from 'models/purchasingSchema';
import { join } from 'path';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { Op } from 'sequelize';

@Injectable()
export class StockPhotoService {
  async create(
    @Res() response: Response,
    createStockPhotoDto: CreateStockPhotoDto,
    photos: Express.Multer.File[],
  ) {
    try {
      const responseData = [];

      for (let i = 0; i < photos.length; i++) {
        // Penamaan untuk Thumbnail
        const thumbnailName = `spho${createStockPhotoDto.spho_stock_id}_${
          path.parse(photos[i].originalname).name
        }`;

        // Tambahkan kondisi untuk fapho_primary
        const spho_primary = i === 0 ? 1 : 0;

        const data = await stock_photo.create({
          spho_stock_id: createStockPhotoDto.spho_stock_id,
          spho_thumbnail_filename: thumbnailName,
          spho_photo_filename: photos[i].filename,
          spho_primary: spho_primary.toString(),
          // spho_url: `/uploads/image/stock/${photos[i].filename}`,
          spho_url: `http://localhost:${process.env.PORT}/purchasing/photo/uploads/image/stock/${photos[i].filename}`,
        });

        responseData.push(data);
      }

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: 'Berhasil Di Tambahkan',
        data: responseData,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `'error', ${error}`,
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async findAll(
    @Res() response: Response,
    stock_name: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    try {
      const pages = pageNumber || 0;
      const limits = pageSize || 5;
      const search = stock_name || '';
      const offset = limits * (pages - 1);

      const totalRows = await stocks.count({
        where: {
          [Op.or]: [
            {
              stock_name: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);
      const data = await stocks.findAll({
        where: {
          stock_name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        include: [
          {
            model: vendor_product,
          },
          {
            model: stock_photo,
          },
        ],
        offset: offset,
        limit: limits,
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
