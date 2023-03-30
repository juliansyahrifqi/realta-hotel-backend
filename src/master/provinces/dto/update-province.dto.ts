import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateProvincesDto } from './create-province.dto';

export class UpdateProvinceDto extends PartialType(CreateProvincesDto) {
  @IsNotEmpty()
  @IsString()
  prov_name: string;

  @IsNotEmpty()
  @IsNumber()
  prov_country_id: number;
}
