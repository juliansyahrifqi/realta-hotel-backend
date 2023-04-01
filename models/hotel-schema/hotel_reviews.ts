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
import { hotels } from './hotels';
import { users } from '../users';

export interface hotel_reviewsAttributes {
  hore_id?: number;
  hore_user_review?: string;
  hore_rating?: number;
  hore_created_on?: Date;
  hore_users_id?: number;
  hore_hotel_id?: number;
}

@Table({ tableName: 'hotel_reviews', schema: 'hotel', timestamps: false })
export class hotel_reviews
  extends Model<hotel_reviewsAttributes, hotel_reviewsAttributes>
  implements hotel_reviewsAttributes {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.hotel_reviews_hore_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_hore_id', using: 'btree', unique: true })
  hore_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(125) })
  hore_user_review?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  hore_rating?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  hore_created_on?: Date;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  hore_users_id?: number;

  @ForeignKey(() => hotels)
  @Column({ allowNull: true, type: DataType.INTEGER })
  hore_hotel_id?: number;

  @BelongsTo(() => hotels)
  hotels?: hotels

  @BelongsTo(() => users)
  users?: users
}
