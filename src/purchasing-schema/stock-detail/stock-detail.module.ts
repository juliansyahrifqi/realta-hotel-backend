import { Module } from '@nestjs/common';
import { StockDetailService } from './stock-detail.service';
import { StockDetailController } from './stock-detail.controller';
import { stock_detail } from 'models/purchasingSchema';
import { SequelizeModule } from '@nestjs/sequelize';
import { facilities } from 'models/hotelSchema';

@Module({
  imports: [SequelizeModule.forFeature([stock_detail, facilities])],
  controllers: [StockDetailController],
  providers: [StockDetailService],
})
export class StockDetailModule {}
