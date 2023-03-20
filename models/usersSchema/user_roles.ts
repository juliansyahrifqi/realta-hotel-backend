import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface user_rolesAttributes {
  uspro_user_id: number;
  uspro_role_id: number;
}

@Table({ tableName: 'user_roles', schema: 'users', timestamps: false })
export class user_roles
  extends Model<user_rolesAttributes, user_rolesAttributes>
  implements user_rolesAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  uspro_user_id!: number;

  @Column({ primaryKey: true, type: DataType.INTEGER })
  uspro_role_id!: number;
}
