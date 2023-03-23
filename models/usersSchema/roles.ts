import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

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
  role_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(35) })
  role_name?: string;
}
