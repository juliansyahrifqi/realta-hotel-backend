import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface service_taskAttributes {
  seta_id?: number;
}

@Table({ tableName: 'service_task', schema: 'master', timestamps: false })
export class service_task
  extends Model<service_taskAttributes, service_taskAttributes>
  implements service_taskAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.service_task_seta_id_seq'::regclass)",
    ),
  })
  seta_id?: number;
}
