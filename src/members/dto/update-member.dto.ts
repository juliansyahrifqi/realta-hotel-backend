import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateMembersDto } from './create-member.dto';

export class UpdateMemberDto extends PartialType(CreateMembersDto) {
  @IsOptional()
  @IsString()
  memb_description?: string;
}
