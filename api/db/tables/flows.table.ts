import {DataType} from 'sequelize-typescript';
import {Table} from './table';

export const flowsTable = new Table('Flows', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  name: {type: DataType.STRING, allowNull: false, unique: true},
  description: {type: DataType.TEXT},
  difficulty: {type: DataType.TINYINT.UNSIGNED},
}));
