/* eslint-disable prettier/prettier */
// create-order-menu-detail.dto.ts

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderMenuDetailDto {
  // @IsOptional()
  // @IsNumber()
  orme_price?: string;

  // @IsOptional()
  // @IsNumber()
  orme_qty?: number;

  @IsOptional()
  @IsString()
  orme_subtotal?: string;

  @IsOptional()
  @IsString()
  orme_discount?: string;

  // @IsNumber()
  omde_orme_id: number;

  // @IsNumber()
  omde_reme_id: number;
}
