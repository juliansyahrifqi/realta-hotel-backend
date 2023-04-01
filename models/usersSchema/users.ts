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
import { user_accounts } from '../paymentSchema/user_accounts';
import { payment_transaction } from '../paymentSchema/payment_transaction';

export interface usersAttributes {
  user_id?: number;
  user_full_name?: string;
  user_type?: string;
  user_company_name?: string;
  user_email?: string;
  user_phone_number?: string;
  user_modified_date?: Date;
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
  user_email?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({ name: 'users_user_phone_number_key', using: 'btree', unique: true })
  user_phone_number?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  user_modified_date?: Date;

  @HasMany(() => user_accounts, { sourceKey: 'user_id' })
  user_accounts?: user_accounts[];

  @HasMany(() => payment_transaction, { sourceKey: 'user_id' })
  payment_transactions?: payment_transaction[];
}
