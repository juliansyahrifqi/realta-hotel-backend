import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { category_group } from './category_group';
import { policy_category_group } from './policy_category_group';

export interface policyAttributes {
  poli_id?: number;
  poli_name?: string;
  poli_description?: string;
}

@Table({ tableName: 'policy', schema: 'master', timestamps: false })
export class policy
  extends Model<policyAttributes, policyAttributes>
  implements policyAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.policy_poli_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_poli_id', using: 'btree', unique: true })
  poli_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  poli_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  poli_description?: string;

  @BelongsToMany(() => category_group, () => policy_category_group)
  category_groups?: category_group[];
}
