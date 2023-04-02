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
import { provinces } from './provinces';
import { regions } from './regions';

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
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.country_country_id_seq'::regclass)",
    ),
  })
  country_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  country_name?: string;

  @ForeignKey(() => regions)
  @Column({ allowNull: true, type: DataType.INTEGER })
  country_region_id?: number;

  @BelongsTo(() => regions)
  regions?: regions;

  @HasMany(() => provinces)
  provinces?: provinces;
}
