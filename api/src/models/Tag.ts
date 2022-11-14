import {TaggableType} from '@acrommunity/common';
import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {PT_Taggable} from '~/models/pivot';
import {Pose} from '~/models/Pose';

@Table({timestamps: false})
export class Tag extends Model<Tag> {
  declare id: number;

  @Column({type: DataType.STRING})
  declare name: string;

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
