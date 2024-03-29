export * from './User';
export * from './Jam';
export * from './Pose';
export * from './Transition';
export * from './Comment';
export * from './Tag';
export * from './Skill';
export * from './Flow';
export * from './Alias';
export * from './List';
export * from './Attachment';
export * from './Image';
export * from './Video';
export * from './Feedback';

import {Alias} from '~/models/Alias';
import {Feedback} from '~/models/Feedback';
import {Flow} from '~/models/Flow';
import {List} from '~/models/List';
import {PT_Attachable, PT_Listable, PT_Markable, PT_Taggable} from '~/models/pivot';
import {Attachment} from './Attachment';
import {Comment} from './Comment';
import {Image} from './Image';
import {Jam} from './Jam';
import {Pose} from './Pose';
import {Skill} from './Skill';
import {Tag} from './Tag';
import {Transition} from './Transition';
import {User} from './User';
import {Video} from './Video';

export const models = [
  User,
  Pose,
  Flow,
  Transition,
  Jam,
  Comment,
  Tag,
  PT_Taggable,
  PT_Attachable,
  PT_Listable,
  PT_Markable,
  Skill,
  Attachment,
  Alias,
  List,
  Image,
  Video,
  Feedback,
];
