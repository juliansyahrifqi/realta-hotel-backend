import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface policy_category_groupAttributes {
  poca_poli_id: number;
  poca_cagro_id: number;
}

@Table({
  tableName: 'policy_category_group',
  schema: 'master',
  timestamps: false,
})
export class policy_category_group
  extends Model<
    policy_category_groupAttributes,
    policy_category_groupAttributes
  >
  implements policy_category_groupAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  poca_poli_id!: number;

  @Column({ primaryKey: true, type: DataType.INTEGER })
  poca_cagro_id!: number;
}
