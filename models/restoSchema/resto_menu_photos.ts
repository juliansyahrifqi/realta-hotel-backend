import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { resto_menus } from './resto_menus';

export interface resto_menu_photosAttributes {
  remp_id?: number;
  remp_thumbnail_filename?: string;
  remp_photo_filename?: string;
  remp_primary?: string;
  remp_url?: string;
  remp_reme_id?: number;
}

@Table({ tableName: 'resto_menu_photos', schema: 'resto', timestamps: false })
export class resto_menu_photos
  extends Model<resto_menu_photosAttributes, resto_menu_photosAttributes>
  implements resto_menu_photosAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('resto.resto_menu_photos_remp_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_remp_id', using: 'btree', unique: true })
  remp_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  remp_thumbnail_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  remp_photo_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  remp_primary?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  remp_url?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  remp_reme_id?: number;

  @HasOne(() => resto_menus, { sourceKey: 'remp_reme_id' })
  resto_menu?: resto_menus;
}
