import { Module } from '@nestjs/common';
import { BookingOrdersService } from './booking_orders.service';
import { BookingOrdersController } from './booking_orders.controller';

@Module({
  controllers: [BookingOrdersController],
  providers: [BookingOrdersService]
})
export class BookingOrdersModule {}
