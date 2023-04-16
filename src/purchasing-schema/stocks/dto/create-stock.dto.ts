export class CreateStockDto {
  stock_name: string;
  stock_description: string;
  stock_quantity: number;
  stock_reorder_point: number;
  stock_used: number;
  stock_scrap: number;
  stock_size: string;
  stock_color: string;
}
