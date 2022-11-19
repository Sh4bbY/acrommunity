import {GEOMETRY} from 'sequelize';
import {DataType} from 'sequelize-typescript';
import {Table} from './table';
import {userTable} from './user.table';

export const jamTable = new Table('Jams', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},

  creatorId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, _foreignKey: {table: userTable.name, field: 'id'}},

  title: {type: DataType.STRING, allowNull: false},
  description: {type: DataType.TEXT},
  recursionType: {type: DataType.STRING, allowNull: false},
  contact: {type: DataType.STRING},
  latlng: {type: GEOMETRY('POINT')},
  address: {type: DataType.STRING, allowNull: false},
  locationInfo: {type: DataType.STRING},

  startDate: {type: DataType.DATE, allowNull: false},
  endDate: {type: DataType.DATE, allowNull: false},

  createdAt: {type: DataType.DATE, allowNull: false},
  updatedAt: {type: DataType.DATE, allowNull: false},
}));
