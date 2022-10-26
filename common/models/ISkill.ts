import {IAlias} from './IAlias';
import {IAttachment} from './IAttachment';
import {IComment} from './IComment';
import {ITag} from './ITag';

export interface ISkill {
  id: number;
  name: string;
  description: string;
  comments?: IComment[];
  aliases?: IAlias[];
  tags?: ITag[];
  attachments?: IAttachment[];
}

const constraints = {};

export const skillValidation = {
  constraints,
  schema: {},
};
