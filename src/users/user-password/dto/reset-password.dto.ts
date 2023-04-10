import { IsNotEmpty, IsStrongPassword, Length, IsJWT } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 100)
  password: string;

  @IsJWT()
  token: string;
}
