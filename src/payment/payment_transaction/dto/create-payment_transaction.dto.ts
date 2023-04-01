import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreatePaymentTransactionDto  { 
  @IsOptional()
  // @IsInt()
  id?: number;

  // @IsNotEmpty()
  // @IsString()
  trxNumber: string;

  // @IsNotEmpty()
  debit: string;

  @IsNotEmpty()
  // @IsNumber()
  credit: string;

  // @IsNotEmpty()
  // @IsString()
  payType: string;

  @IsOptional()
  // @IsString()
  payNote?: string;

  @IsOptional()
  modifiedDate?: string;

  @IsOptional()
  boorOrderNumber?: string;

  @IsOptional()
  ormeOrderNumber: string;

  @IsOptional()
  // @IsInt()
  sourceId?: string;

  @IsOptional()
  // @IsInt()
  targetId?: string;

  @IsOptional()
  // @IsString()
  trxNumberRef?: string;

  @IsOptional()
  // @IsInt()
  userId?: number;
}


