import {DataType} from 'sequelize-typescript';
import {Table} from './table';

export const tagTable = new Table('Tags', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  name: {type: DataType.STRING(50), allowNull: false, unique: true},
}));
