import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class CreateOrUpdateUserPasswordDto {
  uspa_user_id?: number;

  @IsNotEmpty()
  current_password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 100)
  new_password: string;

  retype_password: string;
}
