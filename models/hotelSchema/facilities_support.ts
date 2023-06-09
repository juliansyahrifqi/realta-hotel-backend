import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { hotels } from './hotels';
import { facility_support_hotels } from './facility_support_hotels';

export interface facilities_supportAttributes {
  fs_id?: number;
  fs_name?: string;
  fs_description?: string;
  fs_icon?: string;
  fs_icon_url?: string;
}

@Table({ tableName: 'facilities_support', schema: 'hotel', timestamps: false })
export class facilities_support
  extends Model<facilities_supportAttributes, facilities_supportAttributes>
  implements facilities_supportAttributes {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.facilities_support_fs_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_fs_id', using: 'btree', unique: true })
  fs_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  fs_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  fs_description?: string;

  @Column({ allowNull: true, type: DataType.STRING(40) })
  fs_icon?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  fs_icon_url?: string;

  @BelongsToMany(() => hotels, () => facility_support_hotels)
  hotels?: hotels[];
}
