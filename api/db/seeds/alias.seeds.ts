import {faker} from '@faker-js/faker';
import {AliasableType} from '~/enums';
import {Randomizer} from '~/utils';
import {aliasTable} from '../tables/alias.table';
import {poseSeeds} from './pose.seeds';
import {Seeds} from './Seeds';

export const aliasSeeds = new Seeds(aliasTable.name);

aliasSeeds.setData(async () => {
  const poses = await poseSeeds.getData();

  return Array.from(Array(100).keys()).map((idx) => {
    return {
      id: idx + 1,
      aliasableType: AliasableType.Pose,
      aliasableId: Randomizer.getRandomArrayValue(poses).id,
      name: faker.helpers.unique(faker.random.word),
    };
  });
});
