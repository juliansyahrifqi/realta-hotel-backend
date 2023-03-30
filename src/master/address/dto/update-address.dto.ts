import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
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
