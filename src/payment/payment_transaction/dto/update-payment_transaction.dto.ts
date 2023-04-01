import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentTransactionDto } from './create-payment_transaction.dto';

export class UpdatePaymentTransactionDto extends PartialType(CreatePaymentTransactionDto) {}
