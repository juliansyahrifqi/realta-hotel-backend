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
import { regions } from './regions';
import { provinces } from './provinces';

export interface countryAttributes {
  country_id?: number;
  country_name?: string;
  country_region_id?: number;
}

@Table({ tableName: 'country', schema: 'master', timestamps: false })
export class country
  extends Model<countryAttributes, countryAttributes>
  implements countryAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.country_country_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_country_id', using: 'btree', unique: true })
  country_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({ name: 'country_country_name_key', using: 'btree', unique: true })
  country_name?: string;

  @ForeignKey(() => regions)
  @Column({ allowNull: true, type: DataType.INTEGER })
  country_region_id?: number;

  @BelongsTo(() => regions)
  region?: regions;

  @HasMany(() => provinces, { sourceKey: 'country_id' })
  provinces?: provinces[];
}
