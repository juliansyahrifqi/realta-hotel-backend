import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { work_order_detail } from './work_order_detail';
import { users } from '../../models/usersSchema/users';
// import { employee } from './employee';
import { job_role } from './job_role';
import { employee_pay_history } from './employee_pay_history';
import { employee_department_history } from './employee_department_history';

export interface employeeAttributes {
  emp_id?: number;
  emp_national_id?: string;
  emp_birth_date?: Date;
  emp_marital_status?: string;
  emp_gender?: string;
  emp_hire_date?: Date;
  emp_salaried_flag?: string;
  emp_vacation_hours?: number;
  emp_sickleave_hours?: number;
  emp_current_flag?: number;
  emp_photo?: string;
  emp_modified_date?: Date;
  emp_user_id?: number;
  emp_emp_id?: number;
  emp_joro_id?: number;
}

@Table({ tableName: 'employee', schema: 'human_resources', timestamps: false })
export class employee
  extends Model<employeeAttributes, employeeAttributes>
  implements employeeAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resources.employee_emp_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'employee_pkey', using: 'btree', unique: true })
  emp_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({ name: 'employee_emp_national_id_key', using: 'btree', unique: true })
  emp_national_id?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  emp_birth_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  emp_marital_status?: string;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  emp_gender?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  emp_hire_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  emp_salaried_flag?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_vacation_hours?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_sickleave_hours?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_current_flag?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  emp_photo?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  emp_modified_date?: Date;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_user_id?: number;

  @ForeignKey(() => employee)
  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_emp_id?: number;

  @ForeignKey(() => job_role)
  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_joro_id?: number;

  @HasMany(() => work_order_detail, { sourceKey: 'emp_id' })
  work_order_details?: work_order_detail[];

  @BelongsTo(() => users)
  user?: users;

  @HasMany(() => employee, { sourceKey: 'emp_id' })
  employees?: employee[];

  @BelongsTo(() => employee)
  employee?: employee;

  @BelongsTo(() => job_role)
  job_role?: job_role;

  @HasMany(() => employee_pay_history, { sourceKey: 'emp_id' })
  employee_pay_histories?: employee_pay_history[];

  @HasMany(() => employee_department_history, { sourceKey: 'emp_id' })
  employee_department_histories?: employee_department_history[];
}
