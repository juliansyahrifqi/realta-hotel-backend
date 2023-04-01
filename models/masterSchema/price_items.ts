import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface price_itemsAttributes {
  prit_id?: number;
  prit_name?: string;
  prit_price?: string;
  prit_description?: string;
  prit_type?: string;
  prit_modified_date?: Date;
}

@Table({ tableName: 'price_items', schema: 'master', timestamps: false })
export class price_items
  extends Model<price_itemsAttributes, price_itemsAttributes>
  implements price_itemsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.price_items_prit_id_seq'::regclass)",
    ),
  })
  prit_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  prit_name?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  prit_price?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  prit_description?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  prit_type?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  prit_modified_date?: Date;
}
