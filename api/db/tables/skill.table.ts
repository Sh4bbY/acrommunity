import {DataType} from 'sequelize-typescript';
import {Table} from './table';

export const skillTable = new Table('Skills', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},

  name: {type: DataType.STRING, allowNull: false},
  description: {type: DataType.TEXT},
  difficulty: {type: DataType.TINYINT.UNSIGNED},
  type: {type: DataType.STRING},
}));
