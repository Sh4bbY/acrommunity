import {IAlias} from './IAlias';
import {IAttachment} from './IAttachment';
import {IComment} from './IComment';
import {ITag} from './ITag';

export interface IPose {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  comments?: IComment[];
  aliases?: IAlias[];
  tags?: ITag[];
  attachments?: IAttachment[];
}

const constraints = {
  name: {minLength: 3, maxLength: 30},
};

export const poseValidation = {
  constraints,
  schema: {},
};
