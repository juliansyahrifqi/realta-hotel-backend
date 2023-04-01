import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { address } from '../master/address';
import { facilities_support } from './facilities_support';
import { facility_support_hotels } from './facility_support_hotels';
import { category_group } from '../master/category_group';
import { facilities } from './facilities';
import { members } from '../master/members';
import { users } from '../users/users';
import { hotel_reviews } from './hotel_reviews';
import { booking_orders } from '../booking/booking_orders';

export interface hotelsAttributes {
  hotel_id?: number;
  hotel_name?: string;
  hotel_description?: string;
  hotel_rating_star?: string;
  hotel_phonenumber?: string;
  hotel_status?: string;
  hotel_reason?: string;
  hotel_modified_date?: Date;
  hotel_addr_id?: number;
}

@Table({ tableName: 'hotels', schema: 'hotel', timestamps: false })
export class hotels
  extends Model<hotelsAttributes, hotelsAttributes>
  implements hotelsAttributes {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.hotels_hotel_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_hotel_id', using: 'btree', unique: true })
  hotel_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(85) })
  hotel_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  hotel_description?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(2, 1) })
  hotel_rating_star?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  hotel_phonenumber?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  hotel_status?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  hotel_reason?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  hotel_modified_date?: Date;

  @ForeignKey(() => address)
  @Column({ allowNull: true, type: DataType.INTEGER })
  hotel_addr_id?: number;

  @BelongsTo(() => address)
  address?: address;

  @BelongsToMany(() => facilities_support, () => facility_support_hotels)
  facilities_support?: facilities_support[];

  @BelongsToMany(() => category_group, () => facilities)
  category_groups?: category_group[];

  @BelongsToMany(() => members, () => facilities)
  members?: members[];

  @BelongsToMany(() => users, () => hotel_reviews)
  users_hotel_reviews?: users[];

  @HasMany(() => hotel_reviews)
  hotel_reviews?: hotel_reviews[]

  @BelongsToMany(() => users, () => booking_orders)
  users_booking_orders?: users[];

  @HasMany(() => booking_orders)
  booking_orders?: booking_orders[]
}
