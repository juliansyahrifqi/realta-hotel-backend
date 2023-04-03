import { IsNotEmpty } from 'class-validator';

export class CreateFacilitySupportHotelDto {
  @IsNotEmpty()
  fsh_hotel_id?: number;
  @IsNotEmpty()
  fsh_fs_id?: number;
}
