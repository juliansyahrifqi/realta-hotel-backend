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
import { city } from './city';
import { country } from './country';

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
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.provinces_prov_id_seq'::regclass)",
    ),
  })
  prov_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(85) })
  prov_name?: string;

  @ForeignKey(() => country)
  @Column({ allowNull: true, type: DataType.INTEGER })
  prov_country_id?: number;

  @BelongsTo(() => country)
  countries?: country;

  @HasMany(() => city)
  city?: city;
}
