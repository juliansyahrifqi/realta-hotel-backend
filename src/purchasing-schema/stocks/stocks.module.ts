import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { stocks } from 'models/purchasingSchema/stocks';
import { stock_detail } from 'models/purchasingSchema/stock_detail';
import { SequelizeModule } from '@nestjs/sequelize';
import { stock_photo } from 'models/purchasingSchema/stock_photo';
import { vendor_product } from 'models/purchasingSchema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      stocks,
      stock_detail,
      stock_photo,
      vendor_product,
    ]),
  ],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
