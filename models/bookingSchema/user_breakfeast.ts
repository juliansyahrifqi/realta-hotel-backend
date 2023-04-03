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
import { booking_order_detail } from './booking_order_detail';

export interface user_breakfeastAttributes {
  usbr_borde_id: number;
  usbr_modified_date: Date;
  usbr_total_vacant?: number;
}

@Table({ tableName: 'user_breakfeast', schema: 'booking', timestamps: false })
export class user_breakfeast
  extends Model<user_breakfeastAttributes, user_breakfeastAttributes>
  implements user_breakfeastAttributes
{
  @ForeignKey(() => booking_order_detail)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_usbr_id', using: 'btree', unique: true })
  usbr_borde_id!: number;

  @Column({ primaryKey: true, type: DataType.DATE })
  @Index({ name: 'pk_usbr_id', using: 'btree', unique: true })
  usbr_modified_date!: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  usbr_total_vacant?: number;

  @BelongsTo(() => booking_order_detail)
  booking_order_detail?: booking_order_detail;
}
