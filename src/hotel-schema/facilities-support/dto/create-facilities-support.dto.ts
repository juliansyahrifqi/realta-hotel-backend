import { IsNotEmpty } from 'class-validator';

export class CreateFacilitiesSupportDto {
  @IsNotEmpty()
  fs_name: string;

  @IsNotEmpty()
  fs_description: string;

  @IsNotEmpty()
  fs_icon: string;

  @IsNotEmpty()
  fs_icon_url: string;

  @IsNotEmpty()
  fs_hotel_id: number;
}
