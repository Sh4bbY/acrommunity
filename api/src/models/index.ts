export * from './User';
export * from './Jam';
export * from './Pose';
export * from './Transition';
export * from './Comment';
export * from './Tag';
export * from './Skill';
export * from './Flow';
export * from './Alias';
export * from './Attachment';

import {Alias} from '~/models/Alias';
import {Flow} from '~/models/Flow';
import {PT_Attachable, PT_Taggable} from '~/models/pivot';
import {Attachment} from './Attachment';
import {Comment} from './Comment';
import {Jam} from './Jam';
import {Pose} from './Pose';
import {Skill} from './Skill';
import {Tag} from './Tag';
import {Transition} from './Transition';
import {User} from './User';

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
  Skill,
  Attachment,
  Alias,
];
