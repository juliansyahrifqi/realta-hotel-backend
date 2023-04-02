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
import { provinces } from './provinces';

export interface cityAttributes {
  city_id?: number;
  city_name?: string;
  city_prov_id?: number;
}

@Table({ tableName: 'city', schema: 'master', timestamps: false })
export class city
  extends Model<cityAttributes, cityAttributes>
  implements cityAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.city_city_id_seq'::regclass)",
    ),
  })
  city_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  city_name?: string;

  @ForeignKey(() => provinces)
  @Column({ allowNull: true, type: DataType.INTEGER })
  city_prov_id?: number;

  @BelongsTo(() => provinces)
  provinces?: provinces;
}
