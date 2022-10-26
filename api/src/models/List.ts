import {BelongsTo, BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {ListableType} from '@acrommunity/common';
import {Flow, Pose, Skill, User} from '~/models';
import {PT_Listable} from '~/models/pivot';

@Table({updatedAt: false})
export class List extends Model<List> {
  declare id: number;

  @Column({type: DataType.INTEGER.UNSIGNED})
  declare userId: number;

  @BelongsTo(() => User, 'userId')
  user?: User;

  @Column({type: DataType.STRING})
  declare name: string;

  @Column({type: DataType.STRING})
  declare icon: string;

  @Column({type: DataType.TEXT})
  declare description: string;

  @BelongsToMany(() => Pose,
    {
      through: {
        model: () => PT_Listable,
        scope: {listableType: ListableType.Pose},
        unique: false,
      },
      foreignKey: 'listId',
      constraints: false,
    })
  poses?: Pose[];

  @BelongsToMany(() => Flow,
    {
      through: {
        model: () => PT_Listable,
        scope: {listableType: ListableType.Flow},
        unique: false,
      },
      foreignKey: 'listId',
      constraints: false,
    })
  flows?: Flow[];

  @BelongsToMany(() => Skill,
    {
      through: {
        model: () => PT_Listable,
        scope: {listableType: ListableType.Skill},
        unique: false,
      },
      foreignKey: 'listId',
      constraints: false,
    })
  skills?: Skill[];
}
