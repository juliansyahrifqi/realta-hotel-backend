import { IsNotEmpty } from 'class-validator';

export class LoginGuestDto {
  @IsNotEmpty()
  phone_number: string;
}
