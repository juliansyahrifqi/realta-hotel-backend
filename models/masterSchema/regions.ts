import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface regionsAttributes {
  region_code?: number;
  region_name?: string;
}

@Table({ tableName: 'regions', schema: 'master', timestamps: false })
export class regions
  extends Model<regionsAttributes, regionsAttributes>
  implements regionsAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.regions_region_code_seq'::regclass)",
    ),
  })
  region_code?: number;

  @Column({ allowNull: true, type: DataType.STRING(35) })
  region_name?: string;
}
