/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateOrderMenuDto {
  @IsOptional()
  @IsNumber()
  orme_id?: number;

  // @IsNotEmpty()
  // @IsString()
  orme_order_number: string;

  // @IsNotEmpty()
  // @IsDate()
  orme_order_date: Date;

  // @IsNotEmpty()
  // @IsNumber()
  orme_total_item: number;

  // @IsNotEmpty()
  // @IsString()
  orme_total_discount: string;

  // @IsNotEmpty()
  // @IsString()
  orme_total_amount: string;

  // @IsNotEmpty()
  // @IsString()
  orme_pay_type: string;

  // @IsNotEmpty()
  // @IsString()
  orme_cardnumber: string;

  // @IsNotEmpty()
  // @IsString()
  orme_is_paid: string;

  // @IsOptional()
  // @IsDate()
  orme_modified_date?: Date;
}
