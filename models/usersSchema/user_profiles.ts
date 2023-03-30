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
import { address } from './address';

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
  @Index({ name: 'pkey_user_profiles', using: 'btree', unique: true })
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

  @ForeignKey(() => address)
  @Column({ allowNull: true, type: DataType.INTEGER })
  uspro_addr_id?: number;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  uspro_user_id?: number;

  @BelongsTo(() => users)
  user?: users;

  @BelongsTo(() => address)
  address?: address;
}
