import { IsNotEmpty, IsEmail, IsStrongPassword, Length } from 'class-validator';

export class SignUpEmployeeDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 100)
  password: string;

  @IsNotEmpty()
  confirm_password: string;

  @IsNotEmpty()
  phone_number: string;
}
