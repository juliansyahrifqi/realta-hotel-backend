import { PartialType } from '@nestjs/mapped-types';
import { CreateVendorProductDto } from './create-vendor-product.dto';

export class UpdateVendorProductDto extends PartialType(
  CreateVendorProductDto,
) {
  id: number;
  vepro_qty_stocked: number;
  vepro_qty_remaining: number;
  vepro_price: string;
  vepro_stok_id: number;
  vepro_vendor_id: number;
}
