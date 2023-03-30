import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreatePolicyDto } from './create-policy.dto';

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {
  @IsOptional()
  poli_name: string;

  @IsOptional()
  poli_description: string;
}
