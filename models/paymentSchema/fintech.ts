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
import { entity } from './entity';

export interface fintechAttributes {
  fint_entity_id: number;
  fint_code?: string;
  fint_name?: string;
  fint_modified_date?: Date;
}

@Table({ tableName: 'fintech', schema: 'payment', timestamps: true, createdAt:'fint_modified_date', updatedAt: 'fint_modified_date' })
export class fintech
  extends Model<fintechAttributes, fintechAttributes>
  implements fintechAttributes
{
  @ForeignKey(() => entity)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_fint_entity_id', using: 'btree', unique: true })
  fint_entity_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  @Index({ name: 'fintech_fint_code_key', using: 'btree', unique: true })
  fint_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({ name: 'fintech_fint_name_key', using: 'btree', unique: true })
  fint_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  fint_modified_date?: Date;

  @BelongsTo(() => entity)
  entity?: entity;

}
