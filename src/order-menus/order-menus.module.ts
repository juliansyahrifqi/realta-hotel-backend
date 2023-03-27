import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderMenusService } from './order-menus.service';
import { OrderMenusController } from './order-menus.controller';
import { order_menus } from '../../models/resto_module';

@Module({
  imports: [SequelizeModule.forFeature([order_menus])],
  providers: [OrderMenusService],
  controllers: [OrderMenusController],
})
export class OrderMenusModule {}
