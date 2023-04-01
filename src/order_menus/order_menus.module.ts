import { Module } from '@nestjs/common';
import { OrderMenusService } from './order_menus.service';
import { OrderMenusController } from './order_menus.controller';

@Module({
  controllers: [OrderMenusController],
  providers: [OrderMenusService]
})
export class OrderMenusModule {}
