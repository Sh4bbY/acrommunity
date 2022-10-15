import {faker} from '@faker-js/faker';
import {tagTable} from '../tables';
import {Seeds} from './Seeds';

export const tagSeeds = new Seeds(tagTable.name);

tagSeeds.setData(async () => {
  return Array.from(Array(50).keys()).map((idx) => {
    return {
      id: idx + 1,
      name: faker.helpers.unique(faker.random.word),
      createdAt: faker.date.past(),
    };
  });
});
