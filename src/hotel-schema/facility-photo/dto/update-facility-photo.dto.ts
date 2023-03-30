import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateFacilityPhotoDto } from './create-facility-photo.dto';

export class UpdateFacilityPhotoDto extends PartialType(
  CreateFacilityPhotoDto,
) {
  @IsNotEmpty()
  fapho_faci_id: number;
  @IsNotEmpty()
  fapho_primary: string;
}
