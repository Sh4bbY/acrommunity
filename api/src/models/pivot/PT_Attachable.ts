import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {AttachableType} from '~/enums';
import {Flow, Pose, Skill} from '~/models';
import {Attachment} from '~/models/Attachment';

@Table({
  timestamps: false,
  tableName: 'PT_Attachable',
})
export class PT_Attachable extends Model<PT_Attachable> {
  @Column({type: DataType.STRING, allowNull: false})
  attachableType!: AttachableType;

  @ForeignKey(() => Pose)
  @ForeignKey(() => Skill)
  @ForeignKey(() => Flow)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare attachableId: number;

  @ForeignKey(() => Attachment)
  @Column({type: DataType.INTEGER.UNSIGNED, allowNull: true})
  declare attachmentId: number;
}

