import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserAccountDto {
  @IsNotEmpty()
  // @IsNumber()
  usac_entity_id: number;

  @IsNotEmpty()
  // @IsNumber()
  usac_user_id: number;

  @IsNotEmpty()
  // @IsString()
  usac_account_number: string;

  @IsNotEmpty()
  // @IsNumber()
  usac_saldo: number;

  @IsNotEmpty()
  // @IsString()
  usac_type: string;

  @IsOptional()
  // @IsNumber()
  usac_expmonth?: number;

  @IsOptional()
  // @IsNumber()
  usac_expyear?: number;

  @IsOptional()
  usac_modified_date?: string;
}
