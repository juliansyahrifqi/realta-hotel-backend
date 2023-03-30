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
import { purchase_order_header } from 'models/purchasingSchema';

export interface employeeAttributes {
  emp_id?: number;
}

@Table({ tableName: 'employee', schema: 'humanresource', timestamps: false })
export class employee
  extends Model<employeeAttributes, employeeAttributes>
  implements employeeAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('humanresource.employee_emp_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_emp_id', using: 'btree', unique: true })
  emp_id?: number;

  @HasMany(() => purchase_order_header, { sourceKey: 'emp_id' })
  purchase_order_headers?: purchase_order_header[];
}
