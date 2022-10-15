import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {CommentableType, TaggableType} from '~/enums';
import {Comment, Tag} from '~/models';
import {PT_Taggable} from '~/models/pivot';

export interface SkillData {
  id: number;
  name: string;
  description: string;
}

const constraints = {};

export const skillValidation = {
  constraints,
  schema: {},
};

@Table({updatedAt: false, createdAt: false})
export class Skill extends Model<Skill> {
  public static validation = skillValidation;

  declare id: number;

  @Column({type: DataType.STRING, unique: true})
  declare name: string;

  @Column({type: DataType.TEXT})
  declare description: string;

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
}
