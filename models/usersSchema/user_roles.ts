import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { users } from './users';
import { roles } from './roles';

export interface user_rolesAttributes {
  usro_user_id: number;
  usro_role_id: number;
}

@Table({ tableName: 'user_roles', schema: 'users', timestamps: false })
export class user_roles
  extends Model<user_rolesAttributes, user_rolesAttributes>
  implements user_rolesAttributes
{
  @ForeignKey(() => users)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pkey_user_roles', using: 'btree', unique: true })
  usro_user_id!: number;

  @ForeignKey(() => roles)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pkey_user_roles', using: 'btree', unique: true })
  usro_role_id!: number;

  @BelongsTo(() => users)
  user?: users;

  @BelongsTo(() => roles)
  role?: roles;
}
