import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {AliasableType, AttachableType, CommentableType, TaggableType} from '~/enums';
import {Comment, Tag} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';
import {PT_Taggable} from '~/models/pivot';
import {PT_Attachable} from '~/models/pivot/PT_Attachable';
import {Transition} from '~/models/Transition';

export interface PoseData {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  image: string;
}

const constraints = {
  name: {minLength: 3, maxLength: 30},
};

export const poseValidation = {
  constraints,
  schema: {},
};

@Table({updatedAt: false, createdAt: false})
export class Pose extends Model<Pose> {
  public static validation = poseValidation;

  declare id: number;

  @Column({type: DataType.STRING, unique: true})
  declare name: string;

  @Column({type: DataType.TEXT})
  declare description: string;

  @Column({type: DataType.TINYINT.UNSIGNED})
  declare difficulty: string;

  @Column({type: DataType.TINYINT.UNSIGNED})
  declare persons: number;

  @Column({type: DataType.STRING})
  declare basePosition: string;

  @Column({type: DataType.STRING})
  declare flyerPosition: string;

  @BelongsToMany(() => Pose, () => Transition, 'targetPoseId')
  declare sourcePoses?: Pose[];

  @BelongsToMany(() => Pose, () => Transition, 'sourcePoseId')
  declare targetPoses?: Pose[];

  @HasMany(() => Comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {commentableType: CommentableType.Pose},
  })
  declare comments?: Comment[];

  @HasMany(() => Alias, {
    foreignKey: 'aliasableId',
    constraints: false,
    scope: {aliasableType: AliasableType.Pose},
  })
  declare aliases?: Alias[];

  @BelongsToMany(() => Tag,
    {
      through: {
        model: () => PT_Taggable,
        scope: {taggableType: TaggableType.Pose},
        unique: false,
      },
      foreignKey: 'taggableId',
      constraints: false,
    })
  tags?: Tag[];

  @BelongsToMany(() => Attachment,
    {
      through: {
        model: () => PT_Attachable,
        scope: {attachableType: AttachableType.Pose},
        unique: false,
      },
      foreignKey: 'attachableId',
      constraints: false,
    })
  attachments?: Attachment[];
}
