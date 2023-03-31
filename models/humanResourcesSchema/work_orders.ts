import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { users } from '../usersSchema/users';
import { work_order_detail } from './work_order_detail';

export interface work_ordersAttributes {
  woro_id?: number;
  woro_start_date?: Date;
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
  @Index({ name: 'work_orders_pkey', using: 'btree', unique: true })
  woro_id?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  woro_start_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  woro_status?: string;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  woro_user_id?: number;

  @BelongsTo(() => users)
  user?: users;

  @HasMany(() => work_order_detail, { sourceKey: 'woro_id' })
  work_order_details?: work_order_detail[];
}
