import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateFacilitiesSupportDto } from './create-facilities-support.dto';

export class UpdateFacilitiesSupportDto extends PartialType(
  CreateFacilitiesSupportDto,
) {
  @IsNotEmpty()
  fs_name: string;

  @IsNotEmpty()
  fs_description: string;
}
