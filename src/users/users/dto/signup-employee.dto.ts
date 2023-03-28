import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpEmployeeDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirm_password: string;

  @IsNotEmpty()
  phone_number: string;
}
