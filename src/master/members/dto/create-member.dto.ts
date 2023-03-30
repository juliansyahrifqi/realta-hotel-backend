import { IsString, IsOptional } from 'class-validator';

export class CreateMembersDto {
  @IsString()
  memb_name: string;

  @IsOptional()
  @IsString()
  memb_description?: string;
}
