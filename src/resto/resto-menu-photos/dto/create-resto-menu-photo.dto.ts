/* eslint-disable prettier/prettier */

import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateRestoMenuPhotoDto {
  // @IsString()
  // @IsOptional()
  remp_photo_filename?: string;

  // @IsString()
  // @IsOptional()
  remp_primary?: string;

  // @IsNumber()
  // @IsOptional()
  remp_reme_id?: number;
  remp_thumbnail_filename?: string;
  remp_url?: string;
}
