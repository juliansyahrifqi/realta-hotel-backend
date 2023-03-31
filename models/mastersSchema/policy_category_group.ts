import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';
import { category_group } from './category_group';
import { policy } from './policy';

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
  @ForeignKey(() => category_group)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_poca_poli_id', using: 'btree', unique: true })
  poca_poli_id!: number;

  @ForeignKey(() => policy)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_poca_poli_id', using: 'btree', unique: true })
  poca_cagro_id!: number;
}
