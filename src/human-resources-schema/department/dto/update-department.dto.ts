import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  dept_id?: number;
  dept_name?: string;
  dept_modified_date?: Date = new Date();
}
