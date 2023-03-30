/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  country_name: string;

  @IsOptional()
  country_region_id?: number;
}
