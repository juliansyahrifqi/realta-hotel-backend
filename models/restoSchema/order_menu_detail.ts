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
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('resto.order_menu_detail_omde_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_omde_id', using: 'btree', unique: true })
  omde_id?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  orme_price?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  orme_qty?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  orme_subtotal?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  orme_discount?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  omde_orme_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  omde_reme_id?: number;

  @HasMany(() => order_menus, { sourceKey: 'omde_orme_id' })
  order_menus?: order_menus[];

  @HasMany(() => resto_menus, { sourceKey: 'omde_reme_id' })
  resto_menus?: resto_menus[];
}
