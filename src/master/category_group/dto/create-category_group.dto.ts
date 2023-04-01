/* eslint-disable prettier/prettier */
// create-category-group.dto.ts

import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryGroupDto {
  @IsNotEmpty()
  @IsString()
  cagro_name: string;

  @IsOptional()
  @IsString()
  cagro_description?: string;

  @IsNotEmpty()
  @IsString()
  cagro_type: string;

  @IsOptional()
  @IsString()
  cagro_icon?: string;

  @IsOptional()
  @IsString()
  cagro_icon_url?: string;
}
