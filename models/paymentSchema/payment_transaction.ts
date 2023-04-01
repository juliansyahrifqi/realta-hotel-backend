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
import { order_menus } from '../restoSchema/order_menus';
import { booking_orders } from '../bookingSchema/booking_orders';
import { users } from 'models/usersSchema';

export interface payment_transactionAttributes {
  patr_id?: number;
  patr_trx_number?: string;
  patr_debet?: string;
  patr_credit?: string;
  patr_type?: string;
  patr_note?: string;
  patr_modified_date?: Date;
  patr_boor_order_number?: string;
  patr_orme_order_number?: string;
  patr_source_id?: string;
  patr_target_id?: string;
  patr_trx_number_ref?: string;
  patr_user_id?: number;
}

@Table({
  tableName: 'payment_transaction',
  schema: 'payment',
  timestamps: false,
})
export class payment_transaction
  extends Model<payment_transactionAttributes, payment_transactionAttributes>
  implements payment_transactionAttributes
{
  static save(paymentTransaction: payment_transaction) {
    throw new Error('Method not implemented.');
  }
  @ForeignKey(() => users)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('payment.payment_transaction_patr_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_patr_id', using: 'btree', unique: true })
  patr_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(55),
    defaultValue: Sequelize.literal('generate_trx_numbers_sequence()'),
  })
  @Index({
    name: 'payment_transaction_patr_trx_number_key',
    using: 'btree',
    unique: true,
  })
  patr_trx_number?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  patr_debet?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  patr_credit?: string;

  @Column({ allowNull: true, type: DataType.STRING(3) })
  patr_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  patr_note?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  patr_modified_date?: Date;

  @ForeignKey(() => booking_orders)
  @Column({
    allowNull: true,
    type: DataType.STRING(55),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  patr_boor_order_number?: string;

  @ForeignKey(() => order_menus)
  @Column({
    allowNull: true,
    type: DataType.STRING(55),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  patr_orme_order_number?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  patr_source_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  patr_target_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({
    name: 'payment_transaction_patr_trx_number_ref_key',
    using: 'btree',
    unique: true,
  })
  patr_trx_number_ref?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  patr_user_id?: number;

  @BelongsTo(() => order_menus)
  order_menu?: order_menus;

  @BelongsTo(() => booking_orders)
  booking_order?: booking_orders;
}
