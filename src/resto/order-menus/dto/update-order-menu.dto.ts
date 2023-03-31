/* eslint-disable prettier/prettier */
import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';

export class UpdateOrderMenuDto {
  @IsOptional()
  @IsNumber()
  orme_id?: number;

  @IsOptional()
  @IsString()
  orme_order_number?: string;

  // @IsOptional()
  // @IsDate()
  orme_order_date?: Date;

  // @IsOptional()
  // @IsNumber()
  orme_total_item?: number;

  @IsOptional()
  @IsString()
  orme_total_discount?: string;

  @IsOptional()
  @IsString()
  orme_total_amount?: string;

  @IsOptional()
  @IsString()
  orme_pay_type?: string;

  @IsOptional()
  @IsString()
  orme_cardnumber?: string;

  @IsOptional()
  @IsString()
  orme_is_paid?: string;

  @IsOptional()
  @IsDate()
  orme_modified_date?: Date;
}
