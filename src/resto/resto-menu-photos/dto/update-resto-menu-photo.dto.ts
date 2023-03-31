/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateRestoMenuPhotoDto } from './create-resto-menu-photo.dto';

export class UpdateRestoMenuPhotoDto extends PartialType(
  CreateRestoMenuPhotoDto,
) {}
