import {Role} from '@acrommunity/common';
import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {List} from '~/models/List';
import {PT_Markable} from '~/models/pivot/PT_Markable';

@Table
export class User extends Model<User> {
  declare id: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare username: string;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  declare email: string;

  @Column({type: DataType.STRING, allowNull: false})
  declare password: string;

  @Column({type: DataType.STRING})
  declare avatar: string;

  @Column({type: DataType.STRING})
  declare role: Role;

  @Column({type: DataType.INTEGER.UNSIGNED})
  declare tokenVersion: number;

  @HasMany(() => List, {foreignKey: 'userId'})
  declare lists?: List[];

  @HasMany(() => PT_Markable, {foreignKey: 'userId'})
  declare marks?: PT_Markable[];
}
