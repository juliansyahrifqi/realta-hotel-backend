import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { vendor_product } from './vendor_product';
import { stock_photo } from './stock_photo';
import { stock_detail } from './stock_detail';
import { purchase_order_detail } from './purchase_order_detail';

export interface stocksAttributes {
  stock_id?: number;
  stock_name?: string;
  stock_description?: string;
  stock_quantity?: number;
  stock_reorder_point?: number;
  stock_used?: number;
  stock_scrap?: number;
  stock_size?: string;
  stock_color?: string;
  stock_modified_date?: Date;
}

@Table({ tableName: 'stocks', schema: 'purchasing', timestamps: false })
export class stocks
  extends Model<stocksAttributes, stocksAttributes>
  implements stocksAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('purchasing.stocks_stock_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_stock_id', using: 'btree', unique: true })
  stock_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  stock_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  stock_description?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  stock_quantity?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  stock_reorder_point?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  stock_used?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  stock_scrap?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  stock_size?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  stock_color?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  stock_modified_date?: Date;

  @HasMany(() => vendor_product, { sourceKey: 'stock_id' })
  vendor_products?: vendor_product[];

  @HasMany(() => stock_photo, { sourceKey: 'stock_id' })
  stock_photos?: stock_photo[];

  @HasMany(() => stock_detail, { sourceKey: 'stock_id' })
  stock_details?: stock_detail[];

  @HasMany(() => purchase_order_detail, { sourceKey: 'stock_id' })
  purchase_order_details?: purchase_order_detail[];
}
