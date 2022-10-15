import {TaggableType} from '~/enums';
import {Randomizer} from '~/utils';
import {poseSeeds, tagSeeds} from '..';
import {PT_Taggable} from '../../tables/pivot';
import {Seeds} from '../Seeds';

export const taggableSeeds = new Seeds(PT_Taggable.name);

taggableSeeds.setData(async () => {
  const [poses, tags] = await Promise.all([poseSeeds.getData(), tagSeeds.getData()]);

  return poses.map(pose => ({
    taggableType: TaggableType.Pose,
    taggableId: pose.id,
    tagId: Randomizer.getRandomArrayValue(tags).id,
  }));
});
