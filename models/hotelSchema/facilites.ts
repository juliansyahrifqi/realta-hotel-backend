import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface facilitesAttributes {
  faci_id?: number;
}

@Table({ tableName: 'facilites', schema: 'hotel', timestamps: false })
export class facilites
  extends Model<facilitesAttributes, facilitesAttributes>
  implements facilitesAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.facilites_faci_id_seq'::regclass)",
    ),
  })
  faci_id?: number;
}
