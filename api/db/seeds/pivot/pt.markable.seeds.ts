import {PT_Markable} from '../../tables/pivot';
import {Seeds} from '../Seeds';

export const markableSeeds = new Seeds(PT_Markable.name);

markableSeeds.setData(async () => {
  // const [users, poses] = await Promise.all([
  //   userSeeds.getData(),
  //   poseSeeds.getData(),
  // ]);
  //
  // return users.map(user => ({
  //   userId: user.id,
  //   markableId: Randomizer.getRandomArrayValue(poses).id,
  //   markableType: MarkableType.Pose,
  //   type: MarkType.Favorite,
  // }));
  return [];
});
