/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsNumber()
  addr_id?: number;

  @IsString()
  @IsOptional()
  addr_line1?: string;

  @IsString()
  @IsOptional()
  addr_line2?: string;

  @IsString()
  @IsOptional()
  addr_postal_code?: string;

  @IsOptional()
  addr_spatial_location?: any;

  @IsNumber()
  @IsOptional()
  addr_prov_id?: number;
}
