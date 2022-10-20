import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ListableType} from '~/enums';
import {Flow, Pose, Skill} from '~/models';
import {List} from '~/models/List';

@Table({
  timestamps: false,
  tableName: 'PT_Listable',
})
export class PT_Listable extends Model<PT_Listable> {
  @Column({type: DataType.STRING, allowNull: false})
  listableType!: ListableType;

  @ForeignKey(() => Pose)
  @ForeignKey(() => Skill)
  @ForeignKey(() => Flow)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare listableId: number;

  @ForeignKey(() => List)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare listId: number;
}

