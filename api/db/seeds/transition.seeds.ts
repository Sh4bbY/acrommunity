import {backupData, poses} from '../data';
import {transitionTable} from '../tables';
import {Seeds} from './Seeds';

export const transitionSeeds = new Seeds(transitionTable.name);


if (backupData) {
  transitionSeeds.setData(backupData.transitions);
} else {
  transitionSeeds.setData(async () => {
    const transitions = [];
    let unknownTransitions = 0;
    poses.forEach(pose => {
      pose.targetPoses?.forEach(transitionToName => {
        if (['Exit'].includes(transitionToName)) {
          transitionToName = 'End';
        }

        const targetPose = poses.find(pose => pose.name.toLowerCase() === transitionToName.trim().toLowerCase());
        if (targetPose) {
          transitions.push({sourcePoseId: pose.id, targetPoseId: targetPose.id});
        } else {
          unknownTransitions++;
          console.log(`Pose "${pose.name}": Target Pose not found: "${transitionToName}"`);
        }
      });

      pose.sourcePoses?.forEach(transitionFromName => {
        if (['Entry'].includes(transitionFromName)) {
          transitionFromName = 'Start';
        }

        const sourcePose = poses.find(pose => pose.name.toLowerCase() === transitionFromName.trim().toLowerCase());
        if (sourcePose) {
          transitions.push({sourcePoseId: sourcePose.id, targetPoseId: pose.id});
        } else {
          unknownTransitions++;
          console.log(`Pose "${pose.name}": Source Pose not found: "${transitionFromName}"`);
        }
      });
    });

    console.log('unknown Transitions: ', unknownTransitions);

    return transitions;
  });
}
