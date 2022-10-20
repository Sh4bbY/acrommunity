export * from './user.seeds';
export * from './event.seeds';
export * from './jam.seeds';
export * from './pose.seeds';
export * from './event.seeds';
export * from './transition.seeds';
export * from './tag.seeds';
export * from './alias.seeds';
export * from './flow.seeds';
export * from './list.seeds';

import {aliasSeeds} from './alias.seeds';
import {attachmentSeeds} from './attachment.seeds';
import {commentSeeds} from './comment.seeds';
import {eventSeeds} from './event.seeds';
import {flowSeeds} from './flow.seeds';
import {jamSeeds} from './jam.seeds';
import {listSeeds} from './list.seeds';
import {attachableSeeds} from './pivot/pt.attachable.seeds';
import {listableSeeds} from './pivot/pt.listable.seeds';
import {taggableSeeds} from './pivot/pt.taggable.seeds';
import {poseSeeds} from './pose.seeds';
import {skillSeeds} from './skill.seeds';
import {tagSeeds} from './tag.seeds';
import {transitionSeeds} from './transition.seeds';
import {userSeeds} from './user.seeds';

export const pivotSeeds = [
  transitionSeeds,
  taggableSeeds,
  attachableSeeds,
  listableSeeds,
];

export const seeds = [
  userSeeds,
  eventSeeds,
  poseSeeds,
  jamSeeds,
  commentSeeds,
  tagSeeds,
  skillSeeds,
  attachmentSeeds,
  flowSeeds,
  aliasSeeds,
  listSeeds,
];
