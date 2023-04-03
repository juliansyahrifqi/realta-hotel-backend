import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseOrderDetailDto } from './create-purchase-order-detail.dto';

export class UpdatePurchaseOrderDetailDto extends PartialType(CreatePurchaseOrderDetailDto) {}
