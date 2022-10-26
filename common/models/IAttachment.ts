import {AttachmentType} from '../enums';

export interface IAttachment {
  id: number;
  url: number;
  type: AttachmentType;
  createdAt: Date;
}

const constraints = {};

export const attachmentValidation = {
  constraints,
  schema: {},
};
