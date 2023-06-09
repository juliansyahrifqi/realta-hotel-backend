import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { work_order_detail } from '../../models/humanResourcesSchema/work_order_detail';

export interface service_taskAttributes {
  seta_id?: number;
  seta_name?: string;
  seta_seq?: number;
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
  @Index({ name: 'pk_seta_id', using: 'btree', unique: true })
  seta_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(85) })
  @Index({ name: 'service_task_seta_name_key', using: 'btree', unique: true })
  seta_name?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  seta_seq?: number;

  @HasMany(() => work_order_detail, { sourceKey: 'seta_id' })
  work_order_details?: work_order_detail[];
}
