import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface job_roleAttributes {
  joro_id?: number;
  joro_name?: string;
  joro_modified_date?: Date;
}

@Table({ tableName: 'job_role', schema: 'human_resources', timestamps: false })
export class job_role
  extends Model<job_roleAttributes, job_roleAttributes>
  implements job_roleAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resources.job_role_joro_id_seq'::regclass)",
    ),
  })
  joro_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  joro_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  joro_modified_date?: Date;
}
