import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { vendor } from './vendor';
import { stocks } from './stocks';

export interface vendor_productAttributes {
  vepro_id?: number;
  vepro_qty_stocked?: number;
  vepro_qty_remaining?: number;
  vepro_price?: string;
  vepro_stock_id?: number;
  vepro_vendor_id?: number;
}

@Table({ tableName: 'vendor_product', schema: 'purchasing', timestamps: false })
export class vendor_product
  extends Model<vendor_productAttributes, vendor_productAttributes>
  implements vendor_productAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('purchasing.vendor_product_vepro_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_vepro_id', using: 'btree', unique: true })
  vepro_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  vepro_qty_stocked?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  vepro_qty_remaining?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  vepro_price?: string;

  @ForeignKey(() => stocks)
  @Column({ allowNull: true, type: DataType.INTEGER })
  vepro_stock_id?: number;

  @ForeignKey(() => vendor)
  @Column({ allowNull: true, type: DataType.INTEGER })
  vepro_vendor_id?: number;

  @BelongsTo(() => vendor)
  vendor?: vendor;

  @BelongsTo(() => stocks)
  stock?: stocks;
}
