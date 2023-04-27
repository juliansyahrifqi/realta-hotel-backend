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
import { country } from './country';
import { city } from './city';

export interface provincesAttributes {
  prov_id?: number;
  prov_name?: string;
  prov_country_id?: number;
}

@Table({ tableName: 'provinces', schema: 'master', timestamps: false })
export class provinces
  extends Model<provincesAttributes, provincesAttributes>
  implements provincesAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.provinces_prov_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_prov_id', using: 'btree', unique: true })
  prov_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(85) })
  @Index({ name: 'provinces_prov_name_key', using: 'btree', unique: true })
  prov_name?: string;

  @ForeignKey(() => country)
  @Column({ allowNull: true, type: DataType.INTEGER })
  prov_country_id?: number;

  @BelongsTo(() => country)
  country?: country;

  @HasMany(() => city, { sourceKey: 'prov_id' })
  city?: city[];

  // Ikrar
  // @BelongsTo(() => country)
  // countries?: country;
}
