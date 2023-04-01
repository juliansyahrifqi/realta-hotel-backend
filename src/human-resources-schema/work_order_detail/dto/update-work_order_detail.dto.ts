import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkOrderDetailDto } from './create-work_order_detail.dto';

export class UpdateWorkOrderDetailDto extends PartialType(
  CreateWorkOrderDetailDto,
) {
  wode_id?: number;
  wode_task_name?: string;
  wode_status?: string;
  wode_start_date?: Date;
  wode_end_date?: Date;
  wode_notes?: string;
  wode_emp_id?: number;
  wode_seta_id?: number;
  wode_faci_id?: number;
  wode_woro_id?: number;
}
