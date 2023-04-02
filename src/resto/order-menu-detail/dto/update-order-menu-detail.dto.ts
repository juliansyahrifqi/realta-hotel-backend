/* eslint-disable prettier/prettier */
// update-order-menu-detail.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderMenuDetailDto } from './create-order-menu-detail.dto';

export class UpdateOrderMenuDetailDto extends PartialType(
  CreateOrderMenuDetailDto,
) {}
