export * from './user.seeds';
export * from './pose.seeds';
export * from './transition.seeds';
export * from './tag.seeds';
export * from './alias.seeds';
export * from './flow.seeds';

import {aliasSeeds} from './alias.seeds';
import {attachmentSeeds} from './attachment.seeds';
import {flowSeeds} from './flow.seeds';
import {imageSeeds} from './image.seeds';
import {attachableSeeds} from './pivot/pt.attachable.seeds';
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
];

export const seeds = [
  userSeeds,
  poseSeeds,
  tagSeeds,
  skillSeeds,
  attachmentSeeds,
  flowSeeds,
  aliasSeeds,
  imageSeeds,
  videoSeeds,
];
