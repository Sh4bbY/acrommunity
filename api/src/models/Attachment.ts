import {AttachmentType} from '@acrommunity/common';
import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({updatedAt: false})
export class Attachment extends Model<Attachment> {
  declare id: number;

  @Column({type: DataType.STRING})
  declare url: string;

  @Column({type: DataType.STRING})
  declare type: AttachmentType;

  @Column({type: DataType.DATE})
  declare createdAt: Date;
}
