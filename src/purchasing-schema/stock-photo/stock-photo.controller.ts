import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Put,
  Res,
  Query,
} from '@nestjs/common';
import { StockPhotoService } from './stock-photo.service';
import { CreateStockPhotoDto } from './dto/create-stock-photo.dto';
import { UpdateStockPhotoDto } from './dto/update-stock-photo.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { join } from 'path';

@Controller('purchasing/photo')
export class StockPhotoController {
  constructor(private readonly stockPhotoService: StockPhotoService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('photos', 4, {
      storage: diskStorage({
        destination: './uploads/image/stock',
        filename: function (req, file, cb) {
          const uniqueSuffix = Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  create(
    @Res() response: Response,
    @Body() createStockPhotoDto: CreateStockPhotoDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    return this.stockPhotoService.create(response, createStockPhotoDto, photos);
  }

  @Get()
  async findGallery(
    @Res() response: Response,
    @Query('search') search: string,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const stock = await this.stockPhotoService.findAll(
        response,
        search,
        pageNumber,
        pageSize,
      );
      return stock;
    } catch (error) {
      return {
        message: 'Internal server error',
      };
    }
  }

  @Get('uploads/image/stock/:spho_photo_filename')
  async getProductImage(
    @Param('spho_photo_filename') spho_photo_filename: string,
    @Res() res: Response,
  ) {
    const showImage = join(
      __dirname,
      '../../../../uploads/image/stock/',
      spho_photo_filename,
    );
    res.sendFile(showImage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockPhotoService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('spho_stock_photo', {
      storage: diskStorage({
        destination: './uploads/image/stock',
        filename: function (req, file, cb) {
          const uniqueSuffix = Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async update(
    @UploadedFiles() spho_stock_photo: Express.Multer.File,
    @Body() updateStockPhotoDto: UpdateStockPhotoDto,
    @Param('id') id: number,
  ) {
    const stockPhoto = await this.stockPhotoService.update(
      id,
      updateStockPhotoDto,
      spho_stock_photo,
    );
    return stockPhoto;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockPhotoService.remove(+id);
  }
}
