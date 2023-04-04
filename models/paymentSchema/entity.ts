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
import { bank } from './bank';
import { fintech } from './fintech';
import { user_accounts } from './user_accounts';
import { vendor } from 'models/purchasingSchema';

export interface entityAttributes {
  entity_id?: number;
}

@Table({ tableName: 'entity', schema: 'payment', timestamps: false })
export class entity
  extends Model<entityAttributes, entityAttributes>
  implements entityAttributes
{
  @ForeignKey(() => bank)
  @ForeignKey(() => fintech)
  @ForeignKey(() => user_accounts)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('payment.entity_entity_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_entity_id', using: 'btree', unique: true })
  entity_id?: number;

  @HasOne(() => bank, { sourceKey: 'entity_id' })
  bank?: bank;

  @HasOne(() => fintech, { sourceKey: 'entity_id' })
  fintech?: fintech;

  @HasMany(() => user_accounts, { sourceKey: 'entity_id'})
  user_accounts?: user_accounts[];

  
  @HasMany(() => vendor, { sourceKey: 'entity_id' })
  vendors?: vendor[];

}
