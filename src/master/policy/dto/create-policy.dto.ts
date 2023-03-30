import { IsOptional, IsString } from 'class-validator';

export class CreatePolicyDto {
  @IsOptional()
  poli_id: number;

  @IsString()
  poli_name: string;

  @IsString()
  poli_description: string;
}
