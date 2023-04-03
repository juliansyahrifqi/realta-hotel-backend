import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDetailDto } from './create-stock-detail.dto';

export class UpdateStockDetailDto extends PartialType(CreateStockDetailDto) {
  stod_stock_id: number;
  stod_id: number;
  stod_barcode_number: string;
  stod_status: string;
  stod_notes: string;
  stod_faci_id: number;
  stod_pohe_id: number;
}
