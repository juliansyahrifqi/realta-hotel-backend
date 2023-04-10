import { PartialType } from '@nestjs/mapped-types';
import { CreateJobRoleDto } from './create-job_role.dto';

export class UpdateJobRoleDto extends PartialType(CreateJobRoleDto) {
  joro_id?: number;
  joro_name?: string;
  joro_modified_date?: Date = new Date();
}
