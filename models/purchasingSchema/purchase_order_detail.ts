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
import { purchase_order_header } from './purchase_order_header';
import { stocks } from './stocks';

export interface purchase_order_detailAttributes {
  pode_pohe_id: number;
  pode_id?: number;
  pode_order_qty?: number;
  pode_price?: string;
  pode_line_total?: string;
  pode_received_qty?: string;
  pode_rejected_qty?: string;
  pode_stocked_qty?: string;
  pode_modified_date?: Date;
  pode_stock_id?: number;
}

@Table({
  tableName: 'purchase_order_detail',
  schema: 'purchasing',
  timestamps: false,
})
export class purchase_order_detail
  extends Model<
    purchase_order_detailAttributes,
    purchase_order_detailAttributes
  >
  implements purchase_order_detailAttributes
{
  @ForeignKey(() => purchase_order_header)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_pode_pohe_id', using: 'btree', unique: true })
  pode_pohe_id!: number;

  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('purchasing.purchase_order_detail_pode_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_pode_pohe_id', using: 'btree', unique: true })
  pode_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  pode_order_qty?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  pode_price?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  pode_line_total?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(8, 2) })
  pode_received_qty?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(8, 2) })
  pode_rejected_qty?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(9, 2) })
  pode_stocked_qty?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  pode_modified_date?: Date;

  @ForeignKey(() => stocks)
  @Column({ allowNull: true, type: DataType.INTEGER })
  pode_stock_id?: number;

  @BelongsTo(() => purchase_order_header)
  purchase_order_header?: purchase_order_header;

  @BelongsTo(() => stocks)
  stock?: stocks;
}
