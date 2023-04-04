import { Module } from '@nestjs/common';
import { StockPhotoService } from './stock-photo.service';
import { StockPhotoController } from './stock-photo.controller';
import { stock_photo } from 'models/purchasingSchema';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([stock_photo]),
    MulterModule.register({
      dest: './uploads/image/stock',
    }),
  ],
  controllers: [StockPhotoController],
  providers: [StockPhotoService],
})
export class StockPhotoModule {}
