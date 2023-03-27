import { facilities } from 'models/hotelSchema';
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

export interface category_groupAttributes {
  cagro_id?: number;
  cagro_name?: string;
  cagro_description?: string;
  cagro_type?: string;
  cagro_icon?: string;
  cagro_icon_url?: string;
}

@Table({ tableName: 'category_group', schema: 'master', timestamps: false })
export class category_group
  extends Model<category_groupAttributes, category_groupAttributes>
  implements category_groupAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.category_group_cagro_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'category_group_pkey', using: 'btree', unique: true })
  cagro_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({
    name: 'category_group_cagro_name_key',
    using: 'btree',
    unique: true,
  })
  cagro_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  cagro_description?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  cagro_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  cagro_icon?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  cagro_icon_url?: string;

  @HasMany(() => facilities, { sourceKey: 'cagro_id' })
  facilities?: facilities[];
}
