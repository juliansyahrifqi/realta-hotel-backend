import { hotels } from 'models/hotelSchema';
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
} from 'sequelize-typescript';
import { city } from './city';

export interface addressAttributes {
  addr_id?: number;
  addr_line1?: string;
  addr_line2?: string;
  addr_postal_code?: string;
  addr_spatial_location?: any;
  addr_city_id?: number;
}

@Table({ tableName: 'address', schema: 'master', timestamps: false })
export class address
  extends Model<addressAttributes, addressAttributes>
  implements addressAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.address_addr_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'address_pkey', using: 'btree', unique: true })
  addr_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  addr_line1?: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  addr_line2?: string;

  @Column({ allowNull: true, type: DataType.STRING(5) })
  addr_postal_code?: string;

  @Column({ allowNull: true })
  addr_spatial_location?: string;

  @ForeignKey(() => city)
  @Column({ allowNull: true, type: DataType.INTEGER })
  addr_city_id?: number;

  @HasMany(() => hotels, { sourceKey: 'addr_id' })
  hotels?: hotels[];

  @BelongsTo(() => city)
  city?: city;
}
