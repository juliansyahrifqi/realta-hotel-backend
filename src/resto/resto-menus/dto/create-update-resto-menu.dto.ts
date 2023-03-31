/* eslint-disable prettier/prettier */

import { IsOptional, IsDate } from 'class-validator';
export class CreateRestoMenuDto {
  reme_name: string;
  reme_description: string;
  reme_price: string;
  reme_status: string;
  @IsOptional()
  @IsDate()
  reme_modified_date: Date;
}

export class UpdateRestoMenuDto {
  reme_name?: string;
  reme_description?: string;
  reme_price?: string;
  reme_status?: string;
  @IsOptional()
  @IsDate()
  reme_modified_date?: Date;
}
