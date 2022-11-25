import {FeedbackStatus} from '@acrommunity/common';
import {literal} from 'sequelize';
import {DataType} from 'sequelize-typescript';
import {Table} from './table';
import {userTable} from './user.table';

export const feedbackTable = new Table('Feedbacks', () => ({
  id: {type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  authorId: {type: DataType.INTEGER.UNSIGNED, allowNull: false, _foreignKey: {table: userTable.name, field: 'id'}},
  title: {type: DataType.STRING},
  text: {type: DataType.TEXT},
  status: {type: DataType.STRING, defaultValue: FeedbackStatus.New},
  createdAt: {allowNull: false, type: DataType.DATE, defaultValue: literal('NOW()')},
  updatedAt: {allowNull: false, type: DataType.DATE, defaultValue: literal('NOW()')},
}));
