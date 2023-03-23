import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface user_profilesAttributes {
  uspro_id?: number;
  uspro_national_id?: string;
  uspro_birt_date?: string;
  uspro_job_title?: string;
  uspro_marital_status?: string;
  uspro_gender?: string;
  uspro_addr_id?: number;
  uspro_user_id?: number;
}

@Table({ tableName: 'user_profiles', schema: 'users', timestamps: false })
export class user_profiles
  extends Model<user_profilesAttributes, user_profilesAttributes>
  implements user_profilesAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.user_profiles_uspro_id_seq'::regclass)",
    ),
  })
  uspro_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  uspro_national_id?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  uspro_birt_date?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  uspro_job_title?: string;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  uspro_marital_status?: string;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  uspro_gender?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  uspro_addr_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  uspro_user_id?: number;
}
