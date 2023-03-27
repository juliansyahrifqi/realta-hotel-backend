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

export interface membersAttributes {
  memb_name: string;
  memb_description?: string;
}

@Table({ tableName: 'members', schema: 'master', timestamps: false })
export class members
  extends Model<membersAttributes, membersAttributes>
  implements membersAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(15) })
  @Index({ name: 'members_pkey', using: 'btree', unique: true })
  memb_name!: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  memb_description?: string;

  @HasMany(() => facilities, { sourceKey: 'memb_name' })
  facilities?: facilities[];
}
