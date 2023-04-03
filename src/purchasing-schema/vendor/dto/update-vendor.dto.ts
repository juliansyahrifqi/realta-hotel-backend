import { PartialType } from '@nestjs/mapped-types';
import { CreateVendorDto } from './create-vendor.dto';

export class UpdateVendorDto extends PartialType(CreateVendorDto) {
  id: number;
  vendor_name: string;
  vendor_active: string;
  vendor_priority: string;
  vendor_register: Date;
  vendor_weburl: string;
}
