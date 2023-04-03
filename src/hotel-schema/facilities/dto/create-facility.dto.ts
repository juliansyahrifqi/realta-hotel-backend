import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFacilityDto {
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
  @IsNotEmpty()
  faci_low_price: string;
  @IsNotEmpty()
  faci_high_price: string;
  @IsNotEmpty()
  faci_rate_price: string;
  @IsNotEmpty()
  faci_discount: number;
  @IsNotEmpty()
  faci_tax_rate: number;
  @IsNotEmpty()
  faci_cagro_id: number;
  @IsNotEmpty()
  faci_hotel_id: number;
  @IsNotEmpty()
  faci_memb_name: string;
  @IsNotEmpty()
  faci_user_id: number;
}
