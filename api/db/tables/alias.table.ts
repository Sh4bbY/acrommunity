import {DataType} from 'sequelize-typescript';
import {Table} from './table';

export const aliasTable = new Table('Aliases', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  aliasableType: {type: DataType.STRING, allowNull: false},
  aliasableId: {type: DataType.INTEGER.UNSIGNED, allowNull: false},
  name: {type: DataType.STRING},
}));
