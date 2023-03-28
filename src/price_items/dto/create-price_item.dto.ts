import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreatePriceItemDto {
  @IsString()
  prit_name: string;

  @IsNumber()
  prit_price: string;

  @IsOptional()
  @IsString()
  prit_description?: string;

  @IsOptional()
  @IsString()
  prit_type?: string;

  @IsOptional()
  @IsDate()
  prit_modified_date?: Date;
}
