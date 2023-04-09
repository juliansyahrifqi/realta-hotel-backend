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
import { booking_order_detail } from '../bookingSchema/booking_order_detail';
import { booking_order_detail_extra } from '../bookingSchema/booking_order_detail_extra';

export interface price_itemsAttributes {
  prit_id?: number;
  prit_name?: string;
  prit_price?: string;
  prit_description?: string;
  prit_type?: string;
  prit_modified_date?: Date;
}

@Table({
  tableName: 'price_items',
  schema: 'master',
  timestamps: true,
  createdAt: 'prit_modified_date',
  updatedAt: 'prit_modified_date',
})
export class price_items
  extends Model<price_itemsAttributes, price_itemsAttributes>
  implements price_itemsAttributes {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.price_items_prit_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_prit_id', using: 'btree', unique: true })
  prit_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({ name: 'price_items_prit_name_key', using: 'btree', unique: true })
  prit_name?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  prit_price?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  prit_description?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  prit_type?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  prit_modified_date?: Date;

  @BelongsToMany(() => booking_order_detail, () => booking_order_detail_extra)
  booking_order_details?: booking_order_detail[];
}
