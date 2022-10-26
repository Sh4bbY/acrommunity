import {DataType} from 'sequelize-typescript';
import {Table} from '../table';
import {userTable} from '../user.table';

export const PT_Markable = new Table('PT_Markable', () => ({
    id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
    userId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, _foreignKey: {table: userTable.name, field: 'id'}},
    markableType: {type: DataType.STRING, allowNull: false, unique: 'markable_unique_constraint'},
    markableId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, unique: 'markable_unique_constraint'},
    type: {type: DataType.STRING(20), allowNull: false},
  }),
  {
    timestamps: false,
  });
