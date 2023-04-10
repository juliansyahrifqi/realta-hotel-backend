import { users } from 'models/usersSchema';
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
import { entity } from './entity';
import { bank } from './bank';
import { fintech } from './fintech';

export interface user_accountsAttributes {
  usac_entity_id: number;
  usac_user_id: number;
  usac_account_number?: string;
  usac_saldo?: string;
  usac_type?: string;
  usac_expmonth?: number;
  usac_expyear?: number;
  usac_modified_date?: Date;
}

@Table({
  tableName: 'user_accounts',
  schema: 'payment',
  timestamps: true,
  createdAt: 'usac_modified_date',
  updatedAt: 'usac_modified_date',
})
export class user_accounts
  extends Model<user_accountsAttributes, user_accountsAttributes>
  implements user_accountsAttributes
{
  static save(userAccount: user_accounts) {
    throw new Error('Method not implemented.');
  }
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_usac_entity_id', using: 'btree', unique: true })
  usac_entity_id!: number;

  
  @ForeignKey(() => entity)
  @ForeignKey(() => bank)
  @ForeignKey(() => fintech)
  @ForeignKey(() => users)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_usac_entity_id', using: 'btree', unique: true })
  usac_user_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({
    name: 'user_accounts_usac_account_number_key',
    using: 'btree',
    unique: true,
  })
  usac_account_number?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  usac_saldo?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  usac_type?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  usac_expmonth?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  usac_expyear?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  usac_modified_date?: Date;

  @BelongsTo(() => bank)
  bank?: bank;

  @BelongsTo(() => fintech)
  fintech?: fintech;

  @BelongsTo(() => users)
  user?: users;
}

