import {faker} from '@faker-js/faker';
import {CommentableType} from '@acrommunity/common';
import {Randomizer} from '~/utils';
import {commentTable} from '../tables';
import {poseSeeds} from './pose.seeds';
import {Seeds} from './Seeds';
import {userSeeds} from './user.seeds';

export const commentSeeds = new Seeds(commentTable.name);

commentSeeds.setData(async () => {
  const users = await userSeeds.getData();
  const poses = await poseSeeds.getData();

  return Array.from(Array(100).keys()).map((idx) => {
    return {
      id: idx + 1,
      commentableType: CommentableType.Pose,
      commentableId: Randomizer.getRandomArrayValue(poses).id,
      authorId: Randomizer.getRandomArrayValue(users).id,
      text: faker.lorem.text(),
      createdAt: faker.date.past(),
    };
  });
});
