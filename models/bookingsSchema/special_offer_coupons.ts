import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { booking_order_detail } from './booking_order_detail';
import { special_offers } from './special_offers';
import { facilities } from 'models/hotelsSchema';

export interface special_offer_couponsAttributes {
  soco_id?: number;
  soco_borde_id?: number;
  soco_spof_id?: number;
}

@Table({
  tableName: 'special_offer_coupons',
  schema: 'booking',
  timestamps: false,
})
export class special_offer_coupons
  extends Model<
    special_offer_couponsAttributes,
    special_offer_couponsAttributes
  >
  implements special_offer_couponsAttributes {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('booking.special_offer_coupons_soco_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_soco_id', using: 'btree', unique: true })
  soco_id?: number;

  @ForeignKey(() => booking_order_detail)
  @Column({ allowNull: true, type: DataType.INTEGER })
  soco_borde_id?: number;

  @ForeignKey(() => special_offers)
  @Column({ allowNull: true, type: DataType.INTEGER })
  soco_spof_id?: number;

  @BelongsTo(() => booking_order_detail)
  booking_order_detail?: booking_order_detail

  @BelongsTo(() => special_offers)
  special_offers?: special_offers


}
