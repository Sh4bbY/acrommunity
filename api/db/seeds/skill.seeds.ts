import {faker} from '@faker-js/faker';
import {skillTable} from '../tables';
import {Seeds} from './Seeds';

export const skillSeeds = new Seeds(skillTable.name);

skillSeeds.setData(async () => {
  return Array.from(Array(100).keys()).map((idx) => {
    return {
      id: idx + 1,
      name: faker.helpers.unique(faker.random.word),
      description: faker.lorem.text(),
    };
  });
});
