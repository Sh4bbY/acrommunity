import {BasePosition, FlyerPosition, Status} from '../enums';
import {IAlias} from './IAlias';
import {IAttachment} from './IAttachment';
import {IComment} from './IComment';
import {ITag} from './ITag';

export interface IPose {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  persons: number;
  basePosition: BasePosition;
  flyerPosition: FlyerPosition;
  comments?: IComment[];
  aliases?: IAlias[];
  tags?: ITag[];
  attachments?: IAttachment[];
  status?: Status;
}

const constraints = {
  name: {minLength: 3, maxLength: 30},
};

export const poseValidation = {
  constraints,
  schema: {},
};
