import { PartialType } from '@nestjs/mapped-types';
import { CreateFaciliteDto } from './create-facilite.dto';

export class UpdateFaciliteDto extends PartialType(CreateFaciliteDto) {
  faci_id?: number;
}
