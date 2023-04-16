import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { order_menus } from './order_menus';
import { resto_menus } from './resto_menus';

export interface order_menu_detailAttributes {
  omde_id?: number;
  orme_price?: string;
  orme_qty?: number;
  orme_subtotal?: string;
  orme_discount?: string;
  omde_orme_id?: number;
  omde_reme_id?: number;
}

@Table({ tableName: 'order_menu_detail', schema: 'resto', timestamps: false })
export class order_menu_detail
  extends Model<order_menu_detailAttributes, order_menu_detailAttributes>
  implements order_menu_detailAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('resto.order_menu_detail_omde_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_omde_id', using: 'btree', unique: true })
  omde_id?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  orme_price?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  orme_qty?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  orme_subtotal?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  orme_discount?: string;

  @ForeignKey(() => order_menus)
  @Column({ allowNull: true, type: DataType.INTEGER })
  omde_orme_id?: number;

  @ForeignKey(() => resto_menus)
  @Column({ allowNull: true, type: DataType.INTEGER })
  omde_reme_id?: number;

  @BelongsTo(() => order_menus)
  order_menus?: order_menus;

  @BelongsTo(() => resto_menus)
  resto_menus?: resto_menus;
}
