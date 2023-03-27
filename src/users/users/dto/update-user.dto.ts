import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  user_full_name: string;
  user_type: 'T' | 'C' | 'I';
  user_phone_number: string;

  @IsEmail()
  user_email: string;
  user_company_name: string;
  usro_role_id: number;

  uspro_national_id: string;
  uspro_job_title: string;

  uspro_gender: 'M' | 'F';
  uspro_birt_date: string;
  uspro_marital_status: 'M' | 'S';

  user_photo_profile: string;
  user_hotel_id?: number;
}
