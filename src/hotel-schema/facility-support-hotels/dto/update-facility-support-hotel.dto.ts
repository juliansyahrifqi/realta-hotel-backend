import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateFacilitySupportHotelDto } from './create-facility-support-hotel.dto';

export class UpdateFacilitySupportHotelDto extends PartialType(
  CreateFacilitySupportHotelDto,
) {
  @IsNotEmpty()
  fsh_hotel_id?: number;
  @IsNotEmpty()
  fsh_fs_id?: number;
}
