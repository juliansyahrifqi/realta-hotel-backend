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
import { stocks } from './stocks';

export interface stock_photoAttributes {
  spho_id?: number;
  spho_thumbnail_filename?: string;
  spho_photo_filename?: string;
  spho_primary?: string;
  spho_url?: string;
  spho_stock_id?: number;
}

@Table({ tableName: 'stock_photo', schema: 'purchasing', timestamps: false })
export class stock_photo
  extends Model<stock_photoAttributes, stock_photoAttributes>
  implements stock_photoAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('purchasing.stock_photo_spho_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_spho_id', using: 'btree', unique: true })
  spho_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  spho_thumbnail_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  spho_photo_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  spho_primary?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  spho_url?: string;

  @ForeignKey(() => stocks)
  @Column({ allowNull: true, type: DataType.INTEGER })
  spho_stock_id?: number;

  @BelongsTo(() => stocks)
  stock?: stocks;
}
