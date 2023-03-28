import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkOrderDto } from './create-work_order.dto';

export class UpdateWorkOrderDto extends PartialType(CreateWorkOrderDto) {
  woro_id?: number;
  work_start_date?: Date;
  woro_status?: string;
  woro_user_id?: number;
}
