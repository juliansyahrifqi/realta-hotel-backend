import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface shiftAttributes {
  shift_id?: number;
  shift_name?: string;
  shift_start_time?: Date;
  shift_end_time?: Date;
}

@Table({ tableName: 'shift', schema: 'human_resources', timestamps: false })
export class shift
  extends Model<shiftAttributes, shiftAttributes>
  implements shiftAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resources.shift_shift_id_seq'::regclass)",
    ),
  })
  shift_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  shift_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  shift_start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  shift_end_time?: Date;
}
