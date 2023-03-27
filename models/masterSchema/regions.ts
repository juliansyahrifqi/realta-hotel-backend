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
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.regions_region_code_seq'::regclass)",
    ),
  })
  @Index({ name: 'regions_pkey', using: 'btree', unique: true })
  region_code?: number;

  @Column({ allowNull: true, type: DataType.STRING(35) })
  @Index({ name: 'regions_region_name_key', using: 'btree', unique: true })
  region_name?: string;
}
