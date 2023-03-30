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
import { employee_department_history } from './employee_department_history';

export interface departmentAttributes {
  dept_id?: number;
  dept_name?: string;
  dept_modified_date?: Date;
}

@Table({
  tableName: 'department',
  schema: 'human_resources',
  timestamps: false,
})
export class department
  extends Model<departmentAttributes, departmentAttributes>
  implements departmentAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resources.department_dept_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'department_pkey', using: 'btree', unique: true })
  dept_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  dept_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  dept_modified_date?: Date;

  @HasMany(() => employee_department_history, { sourceKey: 'dept_id' })
  employee_department_histories?: employee_department_history[];
}
