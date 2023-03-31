import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';
import { booking_order_detail } from './booking_order_detail';
import { price_items } from '../mastersSchema/price_items';

export interface booking_order_detail_extraAttributes {
  boex_id?: number;
  boex_price?: string;
  boex_qty?: number;
  boex_subtotal?: string;
  boex_measure_unit?: string;
  boex_borde_id?: number;
  boex_prit_id?: number;
}

@Table({
  tableName: 'booking_order_detail_extra',
  schema: 'booking',
  timestamps: false,
})
export class booking_order_detail_extra
  extends Model<
    booking_order_detail_extraAttributes,
    booking_order_detail_extraAttributes
  >
  implements booking_order_detail_extraAttributes {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('booking.booking_order_detail_extra_boex_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_boex_id', using: 'btree', unique: true })
  boex_id?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  boex_price?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  boex_qty?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  boex_subtotal?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  boex_measure_unit?: string;

  @ForeignKey(() => booking_order_detail)
  @Column({ allowNull: true, type: DataType.INTEGER })
  boex_borde_id?: number;

  @ForeignKey(() => price_items)
  @Column({ allowNull: true, type: DataType.INTEGER })
  boex_prit_id?: number;
}
