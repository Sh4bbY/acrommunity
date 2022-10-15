import {literal} from 'sequelize';
import {DataType} from 'sequelize-typescript';
import {Table} from './table';
import {userTable} from './user.table';

export const commentTable = new Table('Comments', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  authorId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, _foreignKey: {table: userTable.name, field: 'id'}},
  commentableId: {type: DataType.INTEGER, foreignKey: true, allowNull: false},
  commentableType: {type: DataType.STRING, allowNull: false},
  text: {type: DataType.TEXT},
  createdAt: {allowNull: false, type: DataType.DATE, defaultValue: literal('NOW()')},
}));
