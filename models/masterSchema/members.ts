import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
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
  memb_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  memb_description?: string;
}
