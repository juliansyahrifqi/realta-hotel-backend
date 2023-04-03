import { IsNotEmpty } from 'class-validator';

export class CreateFacilitiesSupportDto {
  @IsNotEmpty()
  fs_name: string;

  @IsNotEmpty()
  fs_description: string;
}
