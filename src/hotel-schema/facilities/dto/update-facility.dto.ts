import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateFacilityDto } from './create-facility.dto';

export class UpdateFacilityDto extends PartialType(CreateFacilityDto) {
  @IsNotEmpty()
  faci_name: string;
  @IsNotEmpty()
  faci_description: string;
  @IsNotEmpty()
  faci_max_number: number;
  @IsNotEmpty()
  faci_measure_unit: string;
  @IsNotEmpty()
  faci_room_number: string;
  @IsNotEmpty()
  faci_startdate: Date;
  @IsNotEmpty()
  faci_enddate: Date;
  //===============
  @IsNotEmpty()
  faci_low_price: string;
  @IsNotEmpty()
  faci_high_price: string;
  @IsNotEmpty()
  faci_rate_price: string;
  //===============
  @IsNotEmpty()
  faci_discount: string;
  @IsNotEmpty()
  faci_tax_rate: string;
  @IsNotEmpty()
  faci_hotel_id: number;
  @IsNotEmpty()
  faci_memb_name: string;
}
