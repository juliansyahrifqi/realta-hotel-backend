import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginEmployeeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
