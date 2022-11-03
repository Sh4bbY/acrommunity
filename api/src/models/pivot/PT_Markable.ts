import {MarkableType, MarkType} from '@acrommunity/common';
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Flow, Pose, Skill, User} from '~/models';

@Table({timestamps: false, tableName: 'PT_Markable'})
export class PT_Markable extends Model<PT_Markable> {
  @Column({type: DataType.INTEGER.UNSIGNED})
  declare userId: number;

  @BelongsTo(() => User, 'userId')
  user?: User;

  @Column({type: DataType.STRING, allowNull: false})
  markableType!: MarkableType;

  @ForeignKey(() => Pose)
  @ForeignKey(() => Flow)
  @ForeignKey(() => Skill)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare markableId: number;

  @Column({type: DataType.STRING, allowNull: true})
  declare type: MarkType;

  // @BelongsTo(() => Pose, {foreignKey: 'markableId',  scope: {markableType: MarkableType.Pose}})
  // pose?: Pose;
  //
  // @BelongsTo(() => Flow, {foreignKey: 'markableId', scope: {markableType: MarkableType.Flow}})
  // flow?: Flow;
  //
  // @BelongsTo(() => Skill, {foreignKey: 'markableId', scope: {markableType: MarkableType.Skill}})
  // skill?: Skill;
}

