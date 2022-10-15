import {transitionTable} from '../tables';
import {POSE} from './pose.seeds';
import {Seeds} from './Seeds';

export const transitionSeeds = new Seeds(transitionTable.name);

transitionSeeds.setData(async () => {
  return [
    {sourcePoseId: POSE.FRONT_PLANK.id, targetPoseId: POSE.BIRD.id},
    {sourcePoseId: POSE.FRONT_PLANK.id, targetPoseId: POSE.STRADDLE_THRONE.id},
    {sourcePoseId: POSE.FRONT_PLANK.id, targetPoseId: POSE.THRONE.id},
    {sourcePoseId: POSE.FRONT_PLANK.id, targetPoseId: POSE.FOLDED_LEAF.id},
    {sourcePoseId: POSE.FRONT_PLANK.id, targetPoseId: POSE.SIDE_STAR.id},

    {sourcePoseId: POSE.BIRD.id, targetPoseId: POSE.STRADDLE_THRONE.id},
    {sourcePoseId: POSE.BIRD.id, targetPoseId: POSE.THRONE.id},
    {sourcePoseId: POSE.BIRD.id, targetPoseId: POSE.BOW.id},
    {sourcePoseId: POSE.BIRD.id, targetPoseId: POSE.FOLDED_LEAF.id},
    {sourcePoseId: POSE.BIRD.id, targetPoseId: POSE.SIDE_STAR.id},

    {sourcePoseId: POSE.FOLDED_LEAF.id, targetPoseId: POSE.STRADDLEBAT.id},

    {sourcePoseId: POSE.SIDE_STAR.id, targetPoseId: POSE.REVERSE_BIRD.id},

    {sourcePoseId: POSE.STRADDLE_THRONE.id, targetPoseId: POSE.THRONE.id},
    {sourcePoseId: POSE.STRADDLE_THRONE.id, targetPoseId: POSE.THINKER.id},

    {sourcePoseId: POSE.THRONE.id, targetPoseId: POSE.FOOT_TO_SHIN.id},
    {sourcePoseId: POSE.THRONE.id, targetPoseId: POSE.WHALE.id},
    {sourcePoseId: POSE.THRONE.id, targetPoseId: POSE.REVERSE_THRONE.id},

    {sourcePoseId: POSE.FOOT_TO_SHIN.id, targetPoseId: POSE.SHIN_TO_FOOT.id},

    {sourcePoseId: POSE.STAR.id, targetPoseId: POSE.STRADDLEBAT.id},
    {sourcePoseId: POSE.STRADDLEBAT.id, targetPoseId: POSE.REVERSE_BIRD.id },
  ];
});
