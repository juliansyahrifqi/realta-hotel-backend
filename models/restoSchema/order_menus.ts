import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { payment_transaction } from '../paymentSchema/payment_transaction';
import { order_menu_detail } from './order_menu_detail';
import { users } from '../usersSchema/users';
import { resto_menu_photos } from './resto_menu_photos';

export interface order_menusAttributes {
  orme_id?: number;
  orme_order_number?: string;
  orme_order_date?: Date;
  orme_total_item?: number;
  orme_total_discount?: string;
  orme_total_amount?: string;
  orme_pay_type?: string;
  orme_cardnumber?: string;
  orme_is_paid?: string;
  orme_modified_date?: Date;
  orme_user_id?: number;
}

@Table({ tableName: 'order_menus', schema: 'resto', timestamps: false })
export class order_menus
  extends Model<order_menusAttributes, order_menusAttributes>
  implements order_menusAttributes
{
  @ForeignKey(() => order_menu_detail)
  @ForeignKey(() => resto_menu_photos)
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('resto.order_menus_orme_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_orme_id', using: 'btree', unique: true })
  orme_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  orme_order_number?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  orme_order_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  orme_total_item?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  orme_total_discount?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  orme_total_amount?: string;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  orme_pay_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  orme_cardnumber?: string;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  orme_is_paid?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  orme_modified_date?: Date;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  orme_user_id?: number;

  @HasOne(() => payment_transaction, { sourceKey: 'orme_order_number' })
  payment_transaction?: payment_transaction;

  @BelongsTo(() => users)
  user?: users;

  @HasMany(() => order_menu_detail, { sourceKey: 'orme_id' })
  order_menu_details?: order_menu_detail[];
}
