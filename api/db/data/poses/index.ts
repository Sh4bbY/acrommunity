import {mapAttachment} from '../helpers';
import initialPoses from './initial-poses.json';
// import {standingPoses} from './standing-poses';

export const poses = []
  .concat(initialPoses)
  // .concat(lBasePoses)
  // .concat(standingPoses)
  .map((pose, idx) => ({
    ...pose,
    id: idx + 1,
    attachments: pose.attachments.filter(attachment => !!attachment).map(mapAttachment),
  }));
