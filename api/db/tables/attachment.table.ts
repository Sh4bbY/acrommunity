import {DataType} from 'sequelize-typescript';
import {Table} from './table';

export const attachmentTable = new Table('Attachments', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},

  type: {type: DataType.STRING, allowNull: false},
  url: {type: DataType.STRING, allowNull: false},

  createdAt: {type: DataType.DATE, allowNull: false},
}));
