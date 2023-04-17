import { IsNotEmpty } from 'class-validator';

export class CreateOrUpdateUserMemberDto {
  @IsNotEmpty()
  usme_points: number;
}
