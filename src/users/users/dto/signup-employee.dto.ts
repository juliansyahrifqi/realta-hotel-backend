import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

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

  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;
}
