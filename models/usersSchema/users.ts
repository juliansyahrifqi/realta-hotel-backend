import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { members } from '../../models/masterSchema/members';
import { user_members } from '../../models/usersSchema/user_members';
import { hotels } from '../../models/hotelSchema/hotels';
import { hotel_reviews } from '../../models/hotelSchema/hotel_reviews';
import { booking_orders } from '../../models/bookingSchema/booking_orders';
import { facility_price_history } from '../../models/hotelSchema/facility_price_history';
import { payment_transaction, user_accounts } from 'models/paymentSchema';


export interface usersAttributes {
  user_id?: number;
  user_full_name?: string;
  user_type?: string;
  user_company_name?: string;
  user_email?: string;
  user_phone_number?: string;
  user_photo_profile?: string;
  user_modified_date?: Date;
  user_hotel_id?: number;
}

@Table({ tableName: 'users', schema: 'users', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.users_user_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pkey_users_user_id', using: 'btree', unique: true })
  user_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    defaultValue: Sequelize.literal(
      "('guest'::text || nextval('sequence_for_user_full_name'::regclass))",
    ),
  })
  user_full_name!: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  user_type!: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  user_company_name!: string;

  @Column({ allowNull: true, type: DataType.STRING(256) })
  @Index({ name: 'users_user_email_key', using: 'btree', unique: true })
  user_email!: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({ name: 'users_user_phone_number_key', using: 'btree', unique: true })
  user_phone_number!: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  user_photo_profile!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  user_modified_date!: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_hotel_id?: number;

  @BelongsToMany(() => members, () => user_members)
  members?: members[];

  @BelongsToMany(() => hotels, () => hotel_reviews)
  hotels?: hotels[];

  @BelongsToMany(() => hotels, () => booking_orders)
  bookedHotels?: hotels[];

  @HasMany(() => user_members, { as: 'user_members_booking' })
  user_members?: user_members[];
  @HasMany(() => facility_price_history, { sourceKey: 'user_id' })
  facility_price_history?: facility_price_history[]

  @HasMany(() => user_accounts, { sourceKey: 'user_id' })
  user_accounts?: user_accounts[];

  @HasMany(() => payment_transaction, { sourceKey: 'user_id' })
  payment_transactions?: payment_transaction[];
}