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
import { order_menu_detail } from './order_menu_detail';

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
}

@Table({ tableName: 'order_menus', schema: 'resto', timestamps: false })
export class order_menus
  extends Model<order_menusAttributes, order_menusAttributes>
  implements order_menusAttributes
{
  @ForeignKey(() => order_menu_detail)
  @Column({
    primaryKey: true,
    autoIncrement: true,
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

  @Column({ allowNull: true, type: DataType.NUMBER })
  orme_total_discount?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  orme_total_amount?: string;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  orme_pay_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  orme_cardnumber?: string;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  orme_is_paid?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  orme_modified_date?: Date;

  @BelongsTo(() => order_menu_detail)
  order_menu_detail?: order_menu_detail;
}
