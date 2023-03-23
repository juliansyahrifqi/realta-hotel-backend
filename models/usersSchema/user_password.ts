import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface user_passwordAttributes {
  uspa_user_id?: number;
  uspa_passwordhash?: string;
  uspa_passwordsalt?: string;
}

@Table({ tableName: 'user_password', schema: 'users', timestamps: false })
export class user_password
  extends Model<user_passwordAttributes, user_passwordAttributes>
  implements user_passwordAttributes
{
  @Column({
    autoIncrement: true,
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.user_password_uspa_user_id_seq'::regclass)",
    ),
  })
  uspa_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(128) })
  uspa_passwordhash?: string;

  @Column({ allowNull: true, type: DataType.STRING(128) })
  uspa_passwordsalt?: string;
}
