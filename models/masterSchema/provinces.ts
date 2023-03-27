import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

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
  @Index({ name: 'provinces_pkey', using: 'btree', unique: true })
  prov_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(85) })
  prov_name?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  prov_country_id?: number;
}
