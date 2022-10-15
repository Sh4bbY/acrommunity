import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {User} from '~/models/User';

export interface CommentData {
  id: number;
  authorId: number;
  commentableId: number;
  commentableType: string;
  text: string;
  createdAt: Date;
}

const constraints = {
  text: {minLength: 3, maxLength: 30},
};

export const commentValidation = {
  constraints,
  schema: {},
};

@Table({updatedAt: false, createdAt: false})
export class Comment extends Model<Comment> {
  public static validation = commentValidation;

  declare id: number;

  @Column({type: DataType.INTEGER.UNSIGNED})
  declare authorId: number;

  @BelongsTo(() => User, 'authorId')
  author?: User;

  @Column({type: DataType.TEXT})
  declare text: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  declare commentableId: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare commentableType: string;

  @Column({type: DataType.DATE})
  declare createdAt: Date;
}
