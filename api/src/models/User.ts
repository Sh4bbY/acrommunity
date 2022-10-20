import Joi from 'joi';
import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {List} from '~/models/List';

export interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  tokenVersion: number;
}

const constraints = {
  username: {minLength: 3, maxLength: 30},
  email: {maxLength: 100},
  password: {minLength: 6},
};

export const userValidation = {
  constraints,
  schema: {
    update: Joi.compile(Joi.object({
      username: Joi.string().min(constraints.username.minLength).max(constraints.username.maxLength).required(),
    })),
    email: Joi.compile(Joi.object({
      email: Joi.string().email().max(constraints.email.maxLength).required(),
    })),
    password: Joi.compile(Joi.object({
      password: Joi.string().min(constraints.password.minLength).required(),
    })),
  },
};

@Table
export class User extends Model<User> {
  public static validation = userValidation;

  declare id: number;

  @Column({type: DataType.STRING(userValidation.constraints.username.maxLength), allowNull: false})
  declare username: string;

  @Column({type: DataType.STRING(userValidation.constraints.email.maxLength), unique: true, allowNull: false})
  declare email: string;

  @Column({type: DataType.STRING(128), allowNull: false})
  declare password: string;

  @Column({type: DataType.STRING(128)})
  declare avatar: string;

  @Column({type: DataType.INTEGER.UNSIGNED, defaultValue: 1})
  declare tokenVersion: number;

  @HasMany(() => List, {foreignKey: 'userId'})
  declare lists?: List[];
}
