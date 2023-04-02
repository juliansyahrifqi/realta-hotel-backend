import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProvincesDto {
  @IsNotEmpty()
  @IsString()
  prov_name: string;

  @IsNotEmpty()
  @IsNumber()
  prov_country_id: number;
}
