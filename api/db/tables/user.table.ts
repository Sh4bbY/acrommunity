import {userValidation} from '@acrommunity/common';
import {DataType} from 'sequelize-typescript';
import {Table} from '.';

export const userTable = new Table('Users', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  avatar: {type: DataType.STRING, defaultValue: '/assets/img/profile/default.png'},
  username: {type: DataType.STRING(userValidation.constraints.username.maxLength), unique: true, allowNull: false},
  email: {type: DataType.STRING(userValidation.constraints.email.maxLength), unique: true, allowNull: false},
  password: {type: DataType.STRING(128)},
  role: {type: DataType.STRING, defaultValue: 'user'},
  strategy: {type: DataType.STRING, defaultValue: 'local'},
  tokenVersion: {type: DataType.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1},
  createdAt: {allowNull: false, type: DataType.DATE},
  updatedAt: {allowNull: false, type: DataType.DATE},
}));
