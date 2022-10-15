import {DataType} from 'sequelize-typescript';
import {Table} from '../table';

export const PT_Taggable = new Table('PT_Taggable', () => ({
    id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
    taggableType: {type: DataType.STRING, allowNull: false, unique: 'taggable_unique_constraint'},
    taggableId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, unique: 'taggable_unique_constraint'},
    tagId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, unique: 'taggable_unique_constraint'},
  }),
  {
    timestamps: false,
  });
