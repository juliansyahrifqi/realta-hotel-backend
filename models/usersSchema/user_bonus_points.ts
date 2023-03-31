import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface user_bonus_pointsAttributes {
  ubpo_id?: number;
  ubpo_user_id: number;
  ubpo_total_points?: number;
  ubpo_bonus_type?: string;
  ubpo_created_on?: Date;
}

@Table({ tableName: 'user_bonus_points', schema: 'users', timestamps: false })
export class user_bonus_points
  extends Model<user_bonus_pointsAttributes, user_bonus_pointsAttributes>
  implements user_bonus_pointsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.user_bonus_points_ubpo_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pkey_user_bonus_points', using: 'btree', unique: true })
  ubpo_id?: number;

  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pkey_user_bonus_points', using: 'btree', unique: true })
  ubpo_user_id!: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  ubpo_total_points?: number;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  ubpo_bonus_type?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  ubpo_created_on?: Date;
}
