import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

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
  dept_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  dept_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  dept_modified_date?: Date;
}
