import { PartialType } from '@nestjs/mapped-types';
import { CreateShiftDto } from './create-shift.dto';

export class UpdateShiftDto extends PartialType(CreateShiftDto) {
  shift_id?: number;
  shift_name?: string;
  shift_start_time?: Date;
  shift_end_time?: Date;
}
