import {AliasableType, AttachableType, CommentableType, PoseStatus, SkillType, TaggableType} from '@acrommunity/common';
import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Alias, Attachment, Comment, Tag} from '~/models';
import {PT_Attachable, PT_Taggable} from '~/models/pivot';

@Table({updatedAt: false, createdAt: false})
export class Skill extends Model<Skill> {
  declare id: number;

  @Column({type: DataType.STRING, unique: true})
  declare name: string;

  @Column({type: DataType.TEXT})
  declare description: string;

  @Column({type: DataType.TINYINT.UNSIGNED})
  declare difficulty: string;

  @Column({type: DataType.STRING})
  declare type: SkillType;

  @Column({type: DataType.TINYINT.UNSIGNED})
  declare persons: number;

  @Column({type: DataType.STRING})
  declare status: PoseStatus;

  @HasMany(() => Comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {commentableType: CommentableType.Skill},
  })
  declare comments?: Comment[];

  @BelongsToMany(() => Tag,
    {
      through: {
        model: () => PT_Taggable,
        scope: {taggableType: TaggableType.Skill},
        unique: false,
      },
      foreignKey: 'taggableId',
      constraints: false,
    })
  tags?: Tag[];

  @HasMany(() => Alias, {
    foreignKey: 'aliasableId',
    constraints: false,
    scope: {aliasableType: AliasableType.Skill},
  })
  declare aliases?: Alias[];

  @BelongsToMany(() => Attachment,
    {
      through: {
        model: () => PT_Attachable,
        scope: {attachableType: AttachableType.Skill},
        unique: false,
      },
      foreignKey: 'attachableId',
      constraints: false,
    })
  attachments?: Attachment[];
}
