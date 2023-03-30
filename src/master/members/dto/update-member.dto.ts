import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateMembersDto } from './create-member.dto';

export class UpdateMemberDto extends PartialType(CreateMembersDto) {
  @IsString()
  memb_name: string;

  @IsOptional()
  @IsString()
  memb_description?: string;
}
