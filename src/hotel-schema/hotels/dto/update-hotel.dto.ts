import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, isString } from 'class-validator';
import { CreateHotelDto } from './create-hotel.dto';

export class UpdateHotelDto extends PartialType(CreateHotelDto) {
  @IsNotEmpty()
  hotel_name: string;

  @IsNotEmpty()
  hotel_description: string;

  @IsOptional()
  hotel_rating_star: number;

  @IsNotEmpty()
  hotel_phonenumber: string;

  @IsOptional()
  hotel_modified_date: Date;

  @IsNotEmpty()
  hotel_status: string;

  @IsString()
  @IsOptional()
  hotel_reason: string;

  //===========MASTER============
  @IsNotEmpty()
  city_name: string;

  @IsNotEmpty()
  addr_line1: string;

  @IsOptional()
  addr_line2: string;

  @IsOptional()
  addr_postal_code: string;
}
