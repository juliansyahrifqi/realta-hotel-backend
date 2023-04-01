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
import { hotels } from '../hotel0/hotels';
import { facilities } from '../hotel0/facilities';
import { policy } from './policy';
import { policy_category_group } from './policy_category_group';

export interface category_groupAttributes {
  cagro_id?: number;
  cagro_name?: string;
  cagro_description?: string;
  cagro_type?: string;
  cagro_icon?: string;
  cagro_icon_url?: string;
}

@Table({ tableName: 'category_group', schema: 'master', timestamps: false })
export class category_group
  extends Model<category_groupAttributes, category_groupAttributes>
  implements category_groupAttributes {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.category_group_cagro_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_cagro_id', using: 'btree', unique: true })
  cagro_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({
    name: 'category_group_cagro_name_key',
    using: 'btree',
    unique: true,
  })
  cagro_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  cagro_description?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(25),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  cagro_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  cagro_icon?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    defaultValue: Sequelize.literal('NULL::character varying'),
  })
  cagro_icon_url?: string;

  @BelongsToMany(() => hotels, () => facilities)
  hotels?: hotels[];

  @BelongsToMany(() => policy, () => policy_category_group)
  policies?: policy[];
}
