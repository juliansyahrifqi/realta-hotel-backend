import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_menu_detail } from '../../models/resto_module';
import { OrderMenuDetailController } from './order-menu-detail.controller';
import { OrderMenuDetailService } from './order-menu-detail.service';

@Module({
  imports: [SequelizeModule.forFeature([order_menu_detail])],
  controllers: [OrderMenuDetailController],
  providers: [OrderMenuDetailService],
})
export class OrderMenuDetailModule {}
