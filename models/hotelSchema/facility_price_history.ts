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
import { facilities } from './facilities';
import { users } from 'models/usersSchema';

export interface facility_price_historyAttributes {
  faph_faci_id: number;
  faph_id?: number;
  faph_startdate?: Date;
  faph_enddate?: Date;
  faph_low_price?: string;
  faph_high_price?: string;
  faph_rate_price?: string;
  faph_discount?: string;
  faph_tax_rate?: string;
  faph_modified_date?: Date;
  faph_user_id?: number;
}

@Table({
  tableName: 'facility_price_history',
  schema: 'hotel',
  timestamps: false,
})
export class facility_price_history
  extends Model<
    facility_price_historyAttributes,
    facility_price_historyAttributes
  >
  implements facility_price_historyAttributes
{
  @ForeignKey(() => facilities)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_faph_id', using: 'btree', unique: true })
  faph_faci_id!: number;

  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.facility_price_history_faph_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_faph_id', using: 'btree', unique: true })
  faph_id?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  faph_startdate?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  faph_enddate?: Date;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faph_low_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faph_high_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faph_rate_price?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(4, 2) })
  faph_discount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(4, 2) })
  faph_tax_rate?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  faph_modified_date?: Date;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  faph_user_id?: number;

  @BelongsTo(() => facilities)
  facilities?: facilities;
  @BelongsTo(() => users)
  users?: users;
}
