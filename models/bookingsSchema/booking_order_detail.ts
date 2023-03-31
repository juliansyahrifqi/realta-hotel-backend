import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsToMany,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { special_offers } from './special_offers';
import { special_offer_coupons } from './special_offer_coupons';
import { user_breakfeast } from './user_breakfeast';
import { price_items } from '../mastersSchema/price_items';
import { booking_order_detail_extra } from './booking_order_detail_extra';
import { booking_orders } from './booking_orders';
import { facilities } from '../hotelsSchema/facilities';

export interface booking_order_detailAttributes {
  borde_id?: number;
  border_boor_id: number;
  borde_checkin?: Date;
  borde_checkout?: Date;
  borde_adults?: number;
  borde_kids?: number;
  borde_price?: string;
  borde_extra?: string;
  borde_discount?: string;
  borde_tax?: string;
  borde_subtotal?: string;
  borde_faci_id?: number;
}

@Table({
  tableName: 'booking_order_detail',
  schema: 'booking',
  timestamps: false,
})
export class booking_order_detail
  extends Model<booking_order_detailAttributes, booking_order_detailAttributes>
  implements booking_order_detailAttributes {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('booking.booking_order_detail_borde_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_borde_id', using: 'btree', unique: true })
  @Index({ name: 'uk_borde_id', using: 'btree', unique: true })
  borde_id?: number;

  @ForeignKey(() => booking_orders)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_borde_id', using: 'btree', unique: true })
  border_boor_id!: number;

  @Column({ allowNull: true, type: DataType.DATE })
  borde_checkin?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  borde_checkout?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  borde_adults?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  borde_kids?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_extra?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_discount?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_tax?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_subtotal?: string;

  @ForeignKey(() => facilities)
  @Column({ allowNull: true, type: DataType.INTEGER })
  borde_faci_id?: number;

  @BelongsToMany(() => special_offers, () => special_offer_coupons)
  special_offers?: special_offers[];

  @HasMany(() => user_breakfeast, { sourceKey: 'borde_id' })
  user_breakfeasts?: user_breakfeast[];

  @BelongsToMany(() => price_items, () => booking_order_detail_extra)
  price_items?: price_items[];

  @BelongsTo(() => facilities)
  facility?: facilities;

  @BelongsTo(() => booking_orders)
  booking_orders?: booking_orders
}
