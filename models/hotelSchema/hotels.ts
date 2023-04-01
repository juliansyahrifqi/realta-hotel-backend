import { address } from 'models/masterSchema';
import sequelize from 'sequelize';
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
  BelongsToMany,
} from 'sequelize-typescript';
import { facilities_support, facility_support_hotels } from '.';
import { facilities } from './facilities';
import { hotel_reviews } from './hotel_reviews';

export interface hotelsAttributes {
  hotel_id?: number;
  hotel_name?: string;
  hotel_description?: string;
  hotel_rating_star?: number;
  hotel_phonenumber?: string;
  hotel_status?: string;
  hotel_modified_date?: Date;
  hotel_addr_id?: number;
  hotel_reason?: string;
}

@Table({ tableName: 'hotels', schema: 'hotel', timestamps: false })
export class hotels
  extends Model<hotelsAttributes, hotelsAttributes>
  implements hotelsAttributes
{
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

  @Column({ allowNull: true, type: DataType.DECIMAL })
  hotel_rating_star?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  hotel_phonenumber?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  hotel_status?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  hotel_modified_date?: Date;

  @ForeignKey(() => address)
  @Column({ allowNull: true, type: DataType.INTEGER })
  hotel_addr_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), defaultValue: '' })
  hotel_reason?: string;

  @HasMany(() => facilities, { sourceKey: 'hotel_id' })
  facilities?: facilities[];

  @HasMany(() => hotel_reviews, { sourceKey: 'hotel_id' })
  hotel_reviews?: hotel_reviews[];

  @BelongsToMany(() => facilities_support, () => facility_support_hotels)
  facilities_support?: facilities_support[];

  @BelongsTo(() => address)
  address?: address;
}
