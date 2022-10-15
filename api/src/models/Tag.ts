import Joi from 'joi';
import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {TaggableType} from '~/enums';
import {PT_Taggable} from '~/models/pivot';
import {Pose} from '~/models/Pose';

export interface TagData {
  id: number;
  name: string;
  createdAt: Date;
}

const constraints = {
  title: {minLength: 3, maxLength: 30},
};

export const tagValidation = {
  constraints,
  schema: Joi.object({
    name: Joi.string().min(constraints.title.minLength).max(constraints.title.maxLength).required(),
  }),
};

@Table({timestamps: false})
export class Tag extends Model<Tag> {
  public static validation = tagValidation;

  declare id: number;

  @Column({type: DataType.STRING})
  declare name: string;

  @Column({type: DataType.DATE})
  declare createdAt: Date;

  @BelongsToMany(() => Pose,
    {
      through: {
        model: () => PT_Taggable,
        scope: {taggableType: TaggableType.Pose},
        unique: false,
      },
      foreignKey: 'tagId',
      constraints: false,
    })
  poses?: Pose[];
}
