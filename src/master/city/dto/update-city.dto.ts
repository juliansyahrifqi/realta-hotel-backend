import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateCityDto } from './create-city.dto';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsOptional()
  city_name: string;

  @IsOptional()
  @IsNumber()
  city_prov_id: number;
}
