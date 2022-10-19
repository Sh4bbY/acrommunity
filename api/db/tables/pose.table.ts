import {DataType} from 'sequelize-typescript';
import {Table} from './table';

export const poseTable = new Table('Poses', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  name: {type: DataType.STRING, allowNull: false, unique: true},
  description: {type: DataType.TEXT},
  difficulty: {type: DataType.INTEGER.UNSIGNED, defaultValue: 0},
  persons: {type: DataType.INTEGER.UNSIGNED, defaultValue: 2},
  basePosition: {type: DataType.STRING},
  flyerPosition: {type: DataType.STRING},
}));
