import { IsString, IsNumber } from 'class-validator';

export class CreateServiceTaskDto {
  @IsString()
  seta_name: string;

  @IsNumber()
  seta_seq: number;
}
