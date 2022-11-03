import {DataType} from 'sequelize-typescript';
import {Table} from '.';

export const videoTable = new Table('Videos', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  url: {type: DataType.STRING, unique: true, allowNull: false},
  thumbnail: {type: DataType.STRING, unique: true},
  copyright: {type: DataType.STRING},
  persons: {type: DataType.TINYINT.UNSIGNED},
  bases: {type: DataType.STRING},
  baseType: {type: DataType.STRING},
  mediaId: {type: DataType.STRING},
}));
