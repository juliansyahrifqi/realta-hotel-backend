import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateServiceTaskDto } from './create-service_task.dto';

export class UpdateServiceTaskDto extends PartialType(CreateServiceTaskDto) {
  @IsString()
  seta_name: string;

  @IsNumber()
  seta_seq: number;
}
