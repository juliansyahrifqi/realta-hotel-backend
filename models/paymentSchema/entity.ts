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
import { vendor } from 'models/purchasingSchema';
export interface entityAttributes {
  entity_id?: number;
}

@Table({ tableName: 'entity', schema: 'payment', timestamps: false })
export class entity
  extends Model<entityAttributes, entityAttributes>
  implements entityAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('payment.entity_entity_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_entity_id', using: 'btree', unique: true })
  entity_id?: number;

  @HasMany(() => vendor, { sourceKey: 'entity_id' })
  vendors?: vendor[];
}
