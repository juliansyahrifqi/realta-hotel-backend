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
import { user_roles } from './user_roles';

export interface rolesAttributes {
  role_id?: number;
  role_name?: string;
}

@Table({ tableName: 'roles', schema: 'users', timestamps: false })
export class roles
  extends Model<rolesAttributes, rolesAttributes>
  implements rolesAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.roles_role_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pkey_users_user_role_id', using: 'btree', unique: true })
  role_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(35) })
  role_name?: string;

  @HasMany(() => user_roles, { sourceKey: 'role_id' })
  user_roles?: user_roles[];
}
