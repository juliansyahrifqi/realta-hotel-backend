import { Injectable } from '@nestjs/common';
import { CreateBookingOrderDto } from './dto/create-booking_order.dto';
import { UpdateBookingOrderDto } from './dto/update-booking_order.dto';

@Injectable()
export class BookingOrdersService {
  create(createBookingOrderDto: CreateBookingOrderDto) {
    return 'This action adds a new bookingOrder';
  }

  findAll() {
    return `This action returns all bookingOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingOrder`;
  }

  update(id: number, updateBookingOrderDto: UpdateBookingOrderDto) {
    return `This action updates a #${id} bookingOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingOrder`;
  }
}
