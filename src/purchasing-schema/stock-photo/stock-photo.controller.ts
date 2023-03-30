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
} from '@nestjs/common';
import { StockPhotoService } from './stock-photo.service';
import { CreateStockPhotoDto } from './dto/create-stock-photo.dto';
import { UpdateStockPhotoDto } from './dto/update-stock-photo.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('hr/purchasing/photo/:id')
export class StockPhotoController {
  constructor(private readonly stockPhotoService: StockPhotoService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('spho_photo_filename', 4, {
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
  async create(
    @UploadedFiles() spho_photo_filename: Express.Multer.File[],
    @Body() createStockPhotoDto: CreateStockPhotoDto,
  ) {
    try {
      const photoStock = await this.stockPhotoService.create(
        createStockPhotoDto,
        spho_photo_filename,
      );
      return photoStock;
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    return this.stockPhotoService.findAll();
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
