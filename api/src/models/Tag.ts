import {TaggableType} from '@acrommunity/common';
import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {PT_Taggable} from '~/models/pivot';
import {Pose} from '~/models/Pose';

@Table({updatedAt: false})
export class Tag extends Model<Tag> {
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
