export * from './alias.seeds';
export * from './attachment.seeds';
export * from './comment.seeds';
export * from './event.seeds';
export * from './flow.seeds';
export * from './image.seeds';
export * from './jam.seeds';
export * from './list.seeds';
export * from './pose.seeds';
export * from './skill.seeds';
export * from './tag.seeds';
export * from './transition.seeds';
export * from './user.seeds';
export * from './video.seeds';

import {aliasSeeds} from './alias.seeds';
import {attachmentSeeds} from './attachment.seeds';
import {commentSeeds} from './comment.seeds';
import {eventSeeds} from './event.seeds';
import {flowSeeds} from './flow.seeds';
import {imageSeeds} from './image.seeds';
import {jamSeeds} from './jam.seeds';
import {listSeeds} from './list.seeds';
import {attachableSeeds} from './pivot/pt.attachable.seeds';
import {listableSeeds} from './pivot/pt.listable.seeds';
import {markableSeeds} from './pivot/pt.markable.seeds';
import {taggableSeeds} from './pivot/pt.taggable.seeds';
import {poseSeeds} from './pose.seeds';
import {skillSeeds} from './skill.seeds';
import {tagSeeds} from './tag.seeds';
import {transitionSeeds} from './transition.seeds';
import {userSeeds} from './user.seeds';
import {videoSeeds} from './video.seeds';

export const pivotSeeds = [
  transitionSeeds,
  taggableSeeds,
  attachableSeeds,
  listableSeeds,
  markableSeeds,
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
  imageSeeds,
  videoSeeds,
];
