import { IsNotEmpty } from 'class-validator';

export class SignUpGuestDto {
  @IsNotEmpty()
  phone_number: string;
}
