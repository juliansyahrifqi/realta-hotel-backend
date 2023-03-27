import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface work_ordersAttributes {
  woro_id?: number;
  work_start_date?: Date;
  woro_status?: string;
  woro_user_id?: number;
}

@Table({
  tableName: 'work_orders',
  schema: 'human_resources',
  timestamps: false,
})
export class work_orders
  extends Model<work_ordersAttributes, work_ordersAttributes>
  implements work_ordersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resources.work_orders_woro_id_seq'::regclass)",
    ),
  })
  woro_id?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  work_start_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  woro_status?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  woro_user_id?: number;
}
