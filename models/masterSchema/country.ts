import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

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
  @Index({ name: 'country_pkey', using: 'btree', unique: true })
  country_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({ name: 'country_country_name_key', using: 'btree', unique: true })
  country_name?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  country_region_id?: number;
}
