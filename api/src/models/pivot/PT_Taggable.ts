import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {TaggableType} from '~/enums';
import {Pose, Skill, Tag} from '~/models';

@Table({
  timestamps: false,
  tableName: 'PT_Taggable',
})
export class PT_Taggable extends Model<PT_Taggable> {
  @Column({type: DataType.STRING, allowNull: false})
  taggableType!: TaggableType;

  @ForeignKey(() => Pose)
  @ForeignKey(() => Skill)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare taggableId: number;

  @ForeignKey(() => Tag)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare tagId: number;
}

