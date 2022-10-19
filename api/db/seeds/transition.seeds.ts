import {poses} from '../data';
import {transitionTable} from '../tables';
import {Seeds} from './Seeds';

export const transitionSeeds = new Seeds(transitionTable.name);

transitionSeeds.setData(async () => {
  const transitions = [];

  poses.forEach(pose => {
    pose.transitions?.forEach(transitionToName => {
      const targetPose = poses.find(pose => pose.name === transitionToName);
      if (targetPose) {
        transitions.push({sourcePoseId: pose.id, targetPoseId: targetPose.id});
      } else {
        console.log(`Transition Target "${transitionToName}" not found for Pose "${pose.name}"`);
      }
    });
  });

  return transitions;
});
