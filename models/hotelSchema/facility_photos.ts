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
import { facilities } from './facilities';

export interface facility_photosAttributes {
  fapho_faci_id: number;
  fapho_id?: number;
  fapho_thumbnail_filename?: string;
  fapho_photo_filename?: string;
  fapho_primary?: string;
  fapho_url?: string;
  fapho_modified_date?: Date;
}

@Table({ tableName: 'facility_photos', schema: 'hotel', timestamps: false })
export class facility_photos
  extends Model<facility_photosAttributes, facility_photosAttributes>
  implements facility_photosAttributes {
  @ForeignKey(() => facilities)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_fapho_id', using: 'btree', unique: true })
  fapho_faci_id!: number;

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.facility_photos_fapho_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_fapho_id', using: 'btree', unique: true })
  fapho_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  fapho_thumbnail_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  fapho_photo_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  fapho_primary?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  fapho_url?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  fapho_modified_date?: Date;

  @BelongsTo(() => facilities)
  facilities?: facilities;
}
