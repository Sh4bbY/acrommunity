import {DataType} from 'sequelize-typescript';
import {poseTable} from './pose.table';
import {Table} from './table';

export const transitionTable = new Table('Transitions', () => ({
  // id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  description: {type: DataType.TEXT},
  difficulty: {type: DataType.INTEGER.UNSIGNED},

  sourcePoseId: {type: DataType.INTEGER.UNSIGNED, _foreignKey: {table: poseTable.name, field: 'id'}},
  targetPoseId: {type: DataType.INTEGER.UNSIGNED, _foreignKey: {table: poseTable.name, field: 'id'}},

  // createdAt: {type: DataType.DATE, allowNull: false},
  // updatedAt: {type: DataType.DATE, allowNull: false},
}));
