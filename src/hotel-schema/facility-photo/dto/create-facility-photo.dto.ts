import { IsNotEmpty } from 'class-validator';

export class CreateFacilityPhotoDto {
  @IsNotEmpty()
  fapho_faci_id: number;
  // @IsNotEmpty()
  // fapho_primary: string;
}
