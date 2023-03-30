import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateCategoryGroupDto } from './create-category_group.dto';

export class UpdateCategoryGroupDto extends PartialType(
  CreateCategoryGroupDto,
) {
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
