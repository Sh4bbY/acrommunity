import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {AttachmentType} from '~/enums';

export interface AttachmentData {
  id: number;
  url: number;

  createdAt: Date;
}

const constraints = {};

export const attachmentValidation = {
  constraints,
  schema: {},
};

@Table({updatedAt: false})
export class Attachment extends Model<Attachment> {
  public static validation = attachmentValidation;

  declare id: number;

  @Column({type: DataType.STRING})
  declare url: string;

  @Column({type: DataType.STRING})
  declare type: AttachmentType;

  @Column({type: DataType.STRING})
  declare name: string;

  @Column({type: DataType.DATE})
  declare createdAt: Date;
}
