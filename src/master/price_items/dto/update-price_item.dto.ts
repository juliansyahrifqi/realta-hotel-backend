import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsDate, IsNotEmpty } from 'class-validator';
// import { IsDate } from 'sequelize-typescript';
import { CreatePriceItemDto } from './create-price_item.dto';

export class UpdatePriceItemDto extends PartialType(CreatePriceItemDto) {
  @IsOptional()
  @IsString()
  prit_name?: string;

  @IsNotEmpty()
  prit_price?: string;

  @IsOptional()
  @IsString()
  prit_description?: string;

  @IsOptional()
  @IsString()
  prit_type?: string;

  @IsOptional()
  @IsDate()
  prit_modified_date?: Date = new Date();
}
