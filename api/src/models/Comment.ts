import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {User} from '~/models/User';

@Table({updatedAt: false, createdAt: false})
export class Comment extends Model<Comment> {
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
