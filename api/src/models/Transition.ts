import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Pose} from '~/models/Pose';

@Table({timestamps: false})
export class Transition extends Model<Transition> {
  @Column({type: DataType.INTEGER.UNSIGNED, primaryKey: true})
  declare id: number;

  @Column({type: DataType.TEXT})
  declare description: string;

  @Column({type: DataType.TINYINT.UNSIGNED})
  declare difficulty: number;

  @ForeignKey(() => Pose)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: false})
  declare sourcePoseId: number;

  @BelongsTo(() => Pose, 'sourcePoseId')
  declare sourcePose: Pose;

  @ForeignKey(() => Pose)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: false})
  declare targetPoseId: number;

  @BelongsTo(() => Pose, 'targetPoseId')
  declare targetPose: Pose;
}
