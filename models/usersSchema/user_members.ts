import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface user_membersAttributes {
  usme_user_id?: number;
  usme_memb_name: string;
  usme_promote_date?: Date;
  usme_points?: number;
  usme_type?: string;
}

@Table({ tableName: 'user_members', schema: 'users', timestamps: false })
export class user_members
  extends Model<user_membersAttributes, user_membersAttributes>
  implements user_membersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.user_members_usme_user_id_seq'::regclass)",
    ),
  })
  usme_user_id?: number;

  @Column({ primaryKey: true, type: DataType.STRING(15) })
  usme_memb_name!: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  usme_promote_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  usme_points?: number;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  usme_type?: string;
}
