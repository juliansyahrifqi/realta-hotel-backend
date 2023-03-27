import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface work_order_detailAttributes {
  wode_id?: number;
  wode_task_name?: string;
  wode_status?: string;
  wode_start_date?: Date;
  wode_end_date?: Date;
  wode_notes?: string;
  wode_emp_id?: number;
  wode_seta_id?: number;
  wode_faci_id?: number;
  wode_woro_id?: number;
}

@Table({
  tableName: 'work_order_detail',
  schema: 'human_resources',
  timestamps: false,
})
export class work_order_detail
  extends Model<work_order_detailAttributes, work_order_detailAttributes>
  implements work_order_detailAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resources.work_order_detail_wode_id_seq'::regclass)",
    ),
  })
  wode_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  wode_task_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  wode_status?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  wode_start_date?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  wode_end_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  wode_notes?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  wode_emp_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  wode_seta_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  wode_faci_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  wode_woro_id?: number;
}
