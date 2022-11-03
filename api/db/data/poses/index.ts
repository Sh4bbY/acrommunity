import {mapAttachment} from '../helpers';
import {lBasePoses} from './l-base-poses';
import posesJson from './poses.json';
import {standingPoses} from './standing-poses';

export const poses = []
  .concat(posesJson)
  // .concat(lBasePoses)
  // .concat(standingPoses)
  .map((pose, idx) => ({
    ...pose,
    id: idx + 1,
    attachments: pose.attachments.filter(attachment => !!attachment).map(mapAttachment),
  }));
