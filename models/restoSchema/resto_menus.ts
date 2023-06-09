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
import { resto_menu_photos } from './resto_menu_photos';
import { order_menu_detail } from './order_menu_detail';
import { facilities } from '../hotelSchema/facilities';

export interface resto_menusAttributes {
  reme_faci_id?: number;
  reme_id?: number;
  reme_name?: string;
  reme_description?: string;
  reme_price?: string;
  reme_status?: string;
  reme_modified_date?: Date;
}

@Table({ tableName: 'resto_menus', schema: 'resto', timestamps: false })
export class resto_menus
  extends Model<resto_menusAttributes, resto_menusAttributes>
  implements resto_menusAttributes
{
  @ForeignKey(() => facilities)
  @Column({ allowNull: true, type: DataType.INTEGER })
  reme_faci_id?: number;

  @ForeignKey(() => order_menu_detail)
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('resto.resto_menus_reme_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_resto_menus', using: 'btree', unique: true })
  reme_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  reme_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  reme_description?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  reme_price?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  reme_status?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  reme_modified_date?: Date;

  @HasMany(() => resto_menu_photos, { sourceKey: 'reme_id' })
  resto_menu_photos?: resto_menu_photos[];

  @BelongsTo(() => order_menu_detail)
  order_menu_detail?: order_menu_detail;

  @BelongsTo(() => facilities)
  facility?: facilities;
}
