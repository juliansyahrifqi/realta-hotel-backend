import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingOrderDto } from './create-booking_order.dto';

export class UpdateBookingOrderDto extends PartialType(CreateBookingOrderDto) {}
