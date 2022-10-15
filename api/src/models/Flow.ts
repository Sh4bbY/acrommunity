import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {AliasableType, AttachableType, CommentableType, TaggableType} from '~/enums';
import {Comment, Tag} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';
import {PT_Taggable} from '~/models/pivot';
import {PT_Attachable} from '~/models/pivot/PT_Attachable';

@Table({updatedAt: false, createdAt: false})
export class Flow extends Model<Flow> {
  declare id: number;

  @Column({type: DataType.STRING, unique: true})
  declare name: string;

  @Column({type: DataType.TEXT})
  declare description: string;

  @Column({type: DataType.TINYINT.UNSIGNED})
  declare difficulty: string;

  @HasMany(() => Comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {commentableType: CommentableType.Flow},
  })
  declare comments?: Comment[];

  @HasMany(() => Alias, {
    foreignKey: 'aliasableId',
    constraints: false,
    scope: {aliasableType: AliasableType.Flow},
  })
  declare aliases?: Alias[];

  @BelongsToMany(() => Tag,
    {
      through: {
        model: () => PT_Taggable,
        scope: {taggableType: TaggableType.Flow},
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
        scope: {attachableType: AttachableType.Flow},
        unique: false,
      },
      foreignKey: 'attachableId',
      constraints: false,
    })
  attachments?: Attachment[];
}
