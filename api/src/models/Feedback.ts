import {FeedbackStatus} from '@acrommunity/common';
import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {User} from '~/models/User';

@Table({createdAt: false})
export class Feedback extends Model<Feedback> {
  declare id: number;

  @Column({type: DataType.INTEGER.UNSIGNED})
  declare authorId: number;

  @BelongsTo(() => User, 'authorId')
  author?: User;

  @Column({type: DataType.STRING})
  declare title: string;

  @Column({type: DataType.TEXT})
  declare text: string;

  @Column({type: DataType.STRING})
  declare status: FeedbackStatus;

  @Column({type: DataType.DATE})
  declare createdAt: Date;
}
