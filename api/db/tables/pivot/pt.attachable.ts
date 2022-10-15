import {DataType} from 'sequelize-typescript';
import {Table} from '../table';

export const PT_Attachable = new Table('PT_Attachable', () => ({
    id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
    attachableType: {type: DataType.STRING, allowNull: false, foreignKey: true},
    attachableId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, foreignKey: true},
    attachmentId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, foreignKey: true},
  }),
  {
    timestamps: false,
  });
