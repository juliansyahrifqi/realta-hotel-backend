import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { user_password } from './user_password';
import { user_bonus_points } from './user_bonus_points';
import { user_members } from './user_members';
import { user_roles } from './user_roles';
import { user_profiles } from './user_profiles';

export interface usersAttributes {
  user_id?: number;
  user_full_name?: string;
  user_type?: string;
  user_company_name?: string;
  user_email?: string;
  user_phone_number?: string;
  user_photo_profile?: string;
  user_modified_date?: Date;
  user_hotel_id?: number;
}

@Table({ tableName: 'users', schema: 'users', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.users_user_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pkey_users_user_id', using: 'btree', unique: true })
  user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    defaultValue: Sequelize.literal(
      "('guest'::text || nextval('sequence_for_user_full_name'::regclass))",
    ),
  })
  user_full_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  user_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  user_company_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(256) })
  @Index({ name: 'users_user_email_key', using: 'btree', unique: true })
  user_email?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({ name: 'users_user_phone_number_key', using: 'btree', unique: true })
  user_phone_number?: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  user_photo_profile?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  user_modified_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_hotel_id?: number;

  @HasOne(() => user_password, { sourceKey: 'user_id' })
  user_password?: user_password;

  @HasMany(() => user_bonus_points, { sourceKey: 'user_id' })
  user_bonus_points?: user_bonus_points[];

  @HasMany(() => user_members, { sourceKey: 'user_id' })
  user_members?: user_members[];

  @HasOne(() => user_roles, { sourceKey: 'user_id' })
  user_role?: user_roles;

  @HasMany(() => user_profiles, { sourceKey: 'user_id' })
  user_profiles?: user_profiles[];
}
