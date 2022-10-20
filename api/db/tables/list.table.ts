import {DataType} from 'sequelize-typescript';
import {Table} from './table';
import {userTable} from './user.table';

export const listTable = new Table('Lists', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},

  userId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, _foreignKey: {table: userTable.name, field: 'id'}},

  name: {type: DataType.STRING, allowNull: false},
  icon: {type: DataType.STRING},
  description: {type: DataType.TEXT},
  createdAt: {type: DataType.DATE},
}));
