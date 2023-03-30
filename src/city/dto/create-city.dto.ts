import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  city_name: string;

  @IsNotEmpty()
  @IsNumber()
  city_prov_id: number;
}
