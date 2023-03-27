import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface resto_menu_photosAttributes {
  remp_id?: number;
  remp_photo_filename?: string;
  remp_primary?: string;
  remp_reme_id?: number;
}

@Table({ tableName: 'resto_menu_photos', schema: 'resto', timestamps: false })
export class resto_menu_photos
  extends Model<resto_menu_photosAttributes, resto_menu_photosAttributes>
  implements resto_menu_photosAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('resto.resto_menu_photos_remp_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_remp_id', using: 'btree', unique: true })
  remp_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  remp_photo_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  remp_primary?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  remp_reme_id?: number;
}
