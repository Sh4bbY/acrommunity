import {TaggableType} from '@acrommunity/common';
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Flow, Pose, Skill, Tag} from '~/models';

@Table({timestamps: false, tableName: 'PT_Taggable'})
export class PT_Taggable extends Model<PT_Taggable> {
  @Column({type: DataType.STRING, allowNull: false})
  taggableType!: TaggableType;

  @ForeignKey(() => Pose)
  @ForeignKey(() => Flow)
  @ForeignKey(() => Skill)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare taggableId: number;

  @ForeignKey(() => Tag)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare tagId: number;

  @BelongsTo(() => Tag, 'tagId')
  declare tag: Tag;
}

