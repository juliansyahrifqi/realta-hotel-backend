import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

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
  implements hotelsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
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

  @Column({ allowNull: true, type: DataType.INTEGER })
  hotel_addr_id?: number;
}
