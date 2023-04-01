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
import { facilities_support } from './facilities_support';
import { hotels } from './hotels';

export interface facility_support_hotelsAttributes {
  fsh_id?: number;
  fsh_hotel_id?: number;
  fsh_fs_id?: number;
}

@Table({
  tableName: 'facility_support_hotels',
  schema: 'hotel',
  timestamps: false,
})
export class facility_support_hotels
  extends Model<
    facility_support_hotelsAttributes,
    facility_support_hotelsAttributes
  >
  implements facility_support_hotelsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.facility_support_hotels_fsh_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_fsh_id', using: 'btree', unique: true })
  fsh_id?: number;

  @ForeignKey(() => hotels)
  @Column({ allowNull: true, type: DataType.INTEGER })
  fsh_hotel_id?: number;

  @ForeignKey(() => facilities_support)
  @Column({ allowNull: true, type: DataType.INTEGER })
  fsh_fs_id?: number;

  @BelongsTo(() => hotels, 'fsh_hotel_id')
  hotel?: hotels;

  @BelongsTo(() => facilities_support, 'fsh_fs_id')
  facilities_support?: facilities_support;
}
