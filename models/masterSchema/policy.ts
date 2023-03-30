import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

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
  poli_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  poli_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  poli_description?: string;
}
