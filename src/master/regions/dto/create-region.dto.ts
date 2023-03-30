/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateRegionDto {
  @IsNotEmpty()
  region_name: string;
}
