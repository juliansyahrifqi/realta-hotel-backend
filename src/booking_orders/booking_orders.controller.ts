import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingOrdersService } from './booking_orders.service';
import { CreateBookingOrderDto } from './dto/create-booking_order.dto';
import { UpdateBookingOrderDto } from './dto/update-booking_order.dto';

@Controller('booking-orders')
export class BookingOrdersController {
  constructor(private readonly bookingOrdersService: BookingOrdersService) {}

  @Post()
  create(@Body() createBookingOrderDto: CreateBookingOrderDto) {
    return this.bookingOrdersService.create(createBookingOrderDto);
  }

  @Get()
  findAll() {
    return this.bookingOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingOrderDto: UpdateBookingOrderDto) {
    return this.bookingOrdersService.update(+id, updateBookingOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingOrdersService.remove(+id);
  }
}
