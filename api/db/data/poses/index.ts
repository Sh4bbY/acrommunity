import {lBasePoses} from './l-base-poses';
import {standingPoses} from './standing-poses';

export const poses = []
  .concat(lBasePoses)
  .concat(standingPoses)
  .map((pose, idx) => ({...pose, id: idx + 1}));
