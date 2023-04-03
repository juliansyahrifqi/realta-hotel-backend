import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { stock_detail } from './stock_detail';
import { employee } from 'models/humanResourcesSchema';
import { vendor } from './vendor';
import { purchase_order_detail } from './purchase_order_detail';

export interface purchase_order_headerAttributes {
  pohe_id?: number;
  pohe_number?: string;
  pohe_status?: number;
  pohe_order_date?: Date;
  pohe_subtotal?: string;
  pohe_tax?: string;
  pohe_total_amount?: string;
  pohe_refund?: string;
  pohe_arrival_date?: Date;
  pohe_pay_type?: string;
  pohe_emp_id?: number;
  pohe_vendor_id?: number;
  pohe_line_items?: number;
}

@Table({
  tableName: 'purchase_order_header',
  schema: 'purchasing',
  timestamps: false,
})
export class purchase_order_header
  extends Model<
    purchase_order_headerAttributes,
    purchase_order_headerAttributes
  >
  implements purchase_order_headerAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('purchasing.purchase_order_header_pohe_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_pohe_id', using: 'btree', unique: true })
  pohe_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  @Index({
    name: 'purchase_order_header_pohe_number_key',
    using: 'btree',
    unique: true,
  })
  pohe_number?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  pohe_status?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  pohe_order_date?: Date;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  pohe_subtotal?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  pohe_tax?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  pohe_total_amount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  pohe_refund?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  pohe_arrival_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  pohe_pay_type?: string;

  @ForeignKey(() => employee)
  @Column({ allowNull: true, type: DataType.INTEGER })
  pohe_emp_id?: number;

  @ForeignKey(() => vendor)
  @Column({ allowNull: true, type: DataType.INTEGER })
  pohe_vendor_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  pohe_line_items?: number;

  @HasMany(() => stock_detail, { sourceKey: 'pohe_id' })
  stock_details?: stock_detail[];

  @BelongsTo(() => employee)
  employee?: employee;

  @BelongsTo(() => vendor)
  vendor?: vendor;

  @HasMany(() => purchase_order_detail, { sourceKey: 'pohe_id' })
  purchase_order_details?: purchase_order_detail[];
}
