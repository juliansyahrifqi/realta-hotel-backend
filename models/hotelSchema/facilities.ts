import { category_group, members } from 'models/masterSchema';
import { users } from 'models/usersSchema';
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
import { facility_photos, facility_price_history, hotels } from '.';

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
  faci_discount?: number;
  faci_tax_rate?: number;
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
    autoIncrement: true,
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

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_discount?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_tax_rate?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  faci_modified_date?: Date;

  @ForeignKey(() => category_group)
  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_cagro_id?: number;

  @ForeignKey(() => hotels)
  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_hotel_id?: number;

  @ForeignKey(() => members)
  @Column({ allowNull: true, type: DataType.STRING(125) })
  faci_memb_name?: string;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_user_id?: number;

  @BelongsTo(() => category_group)
  category_group?: category_group;

  @BelongsTo(() => hotels)
  hotels?: hotels;

  @BelongsTo(() => members)
  members?: members;

  @BelongsTo(() => users)
  users?: users;

  @HasMany(() => facility_photos, { sourceKey: 'faci_id' })
  facility_photos?: facility_photos[];

  @HasMany(() => facility_price_history, { sourceKey: 'faci_id' })
  facility_price_history?: facility_price_history[];
}
