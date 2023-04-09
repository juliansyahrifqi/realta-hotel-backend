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
import { users } from '../usersSchema/users';
import { user_members } from '../usersSchema/user_members';
import { hotels } from '../hotelSchema/hotels';
import { facilities } from '../hotelSchema/facilities';

export interface membersAttributes {
  memb_name: string;
  memb_description?: string;
}

@Table({ tableName: 'members', schema: 'master', timestamps: false })
export class members
  extends Model<membersAttributes, membersAttributes>
  implements membersAttributes {
  @Column({ primaryKey: true, type: DataType.STRING(15) })
  @Index({ name: 'pk_memb_name', using: 'btree', unique: true })
  memb_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  memb_description?: string;

  @BelongsToMany(() => users, () => user_members)
  users?: users[];

  @BelongsToMany(() => hotels, () => facilities)
  hotels?: hotels[];
  user_members: any;
}
