import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDepatmentHistoryDto } from './create-employee_depatment_history.dto';

export class UpdateEmployeeDepatmentHistoryDto extends PartialType(
  CreateEmployeeDepatmentHistoryDto,
) {
  edhi_id?: number;
  edhi_emp_id?: number;
  edhi_start_date?: Date;
  edhi_end_date?: Date;
  edhi_modified_date?: Date = new Date();
  edhi_dept_id?: number;
  edhi_shift_id?: number;
}
