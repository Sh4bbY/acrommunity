import {DataType} from 'sequelize-typescript';
import {listTable} from '../list.table';
import {Table} from '../table';

export const PT_Listable = new Table('PT_Listable', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  listableType: {type: DataType.STRING, allowNull: false, unique: 'listable_unique_constraint'},
  listableId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, unique: 'listable_unique_constraint'},
  // listId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, unique: 'listable_unique_constraint'},
  listId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, _foreignKey: {table: listTable.name, field: 'id'}},
}), {
  timestamps: false,
});
