import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceTaskDto } from './create-service_task.dto';

export class UpdateServiceTaskDto extends PartialType(CreateServiceTaskDto) {
  seta_id?: number;
}
