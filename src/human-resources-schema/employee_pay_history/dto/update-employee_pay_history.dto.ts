import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeePayHistoryDto } from './create-employee_pay_history.dto';

export class UpdateEmployeePayHistoryDto extends PartialType(
  CreateEmployeePayHistoryDto,
) {
  ephi_emp_id?: number;
  ephi_rate_change_date: Date;
  ephi_rate_salary?: string;
  ephi_pay_frequence?: number;
  ephi_modified_date?: Date = new Date();
}
