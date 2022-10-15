import {DataType} from 'sequelize-typescript';
import {Table} from './table';
import {userTable} from './user.table';

export const jamTable = new Table('Jams', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},

  creatorId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, _foreignKey: {table: userTable.name, field: 'id'}},

  title: {type: DataType.STRING, allowNull: false},
  description: {type: DataType.TEXT},

  startDate: {type: DataType.DATE, allowNull: false},
  endDate: {type: DataType.DATE, allowNull: false},

  createdAt: {type: DataType.DATE, allowNull: false},
  updatedAt: {type: DataType.DATE, allowNull: false},
}));
