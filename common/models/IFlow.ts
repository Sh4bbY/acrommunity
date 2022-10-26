import {IAlias} from './IAlias';
import {IAttachment} from './IAttachment';
import {IComment} from './IComment';
import {ITag} from './ITag';

export interface IFlow {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  comments?: IComment[];
  aliases?: IAlias[];
  tags?: ITag[];
  attachments?: IAttachment[];
}

const constraints = {
  name: {minLength: 3, maxLength: 100},
};

export const flowValidation = {
  constraints,
  schema: {},
};
