import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { facility_photos } from './facility_photos';
import { facility_price_history } from './facility_price_history';
import { booking_orders } from '../bookingSchema/booking_orders';
import { booking_order_detail } from '../bookingSchema/booking_order_detail';
import { category_group } from '../masterSchema/category_group';
import { hotels } from './hotels';
import { members } from '../masterSchema/members';
import { special_offer_coupons } from 'models/bookingSchema';
import { users } from 'models/usersSchema';
import { stock_detail } from 'models/purchasingSchema';

export interface facilitiesAttributes {
  faci_id?: number;
  faci_name?: string;
  faci_description?: string;
  faci_max_number?: number;
  faci_measure_unit?: string;
  faci_room_number?: string;
  faci_startdate?: Date;
  faci_enddate?: Date;
  faci_low_price?: string;
  faci_high_price?: string;
  faci_rate_price?: string;
  faci_discount?: string;
  faci_tax_rate?: string;
  faci_modified_date?: Date;
  faci_cagro_id?: number;
  faci_hotel_id?: number;
  faci_memb_name?: string;
  faci_user_id?: number;
}

@Table({ tableName: 'facilities', schema: 'hotel', timestamps: false })
export class facilities
  extends Model<facilitiesAttributes, facilitiesAttributes>
  implements facilitiesAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.facilities_faci_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_faci_id', using: 'btree', unique: true })
  faci_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(125) })
  faci_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  faci_description?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_max_number?: number;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  faci_measure_unit?: string;

  @Column({ allowNull: true, type: DataType.STRING(6) })
  @Index({
    name: 'facilities_faci_room_number_key',
    using: 'btree',
    unique: true,
  })
  faci_room_number?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  faci_startdate?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  faci_enddate?: Date;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_low_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_high_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_rate_price?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(4, 2) })
  faci_discount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(4, 2) })
  faci_tax_rate?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  faci_modified_date?: Date;

  @ForeignKey(() => category_group)
  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_cagro_id?: number;

  @ForeignKey(() => hotels)
  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_hotel_id?: number;

  @ForeignKey(() => members)
  @Column({ allowNull: true, type: DataType.STRING(15) })
  faci_memb_name?: string;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_user_id?: number;

  @BelongsTo(() => hotels)
  hotel?: hotels;

  @BelongsTo(() => category_group)
  category_group?: category_group;

  @HasMany(() => facility_photos, { sourceKey: 'faci_id' })
  facility_photos?: facility_photos[];

  @HasMany(() => facility_price_history, { sourceKey: 'faci_id' })
  facility_price_history?: facility_price_history[];

  @BelongsToMany(() => booking_orders, () => booking_order_detail)
  booking_orders?: booking_orders[];

  @HasMany(() => booking_order_detail)
  booking_order_details?: booking_order_detail[];

  @BelongsTo(() => users)
  users?: users;

  // STOCK DETAIL
  @HasMany(() => stock_detail, { sourceKey: 'faci_id' })
  stock_detail?: stock_detail[];
}
