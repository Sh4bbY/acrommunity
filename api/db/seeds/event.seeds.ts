import {faker} from '@faker-js/faker';
import {Randomizer} from '~/utils';
import {eventTable} from '../tables';
import {Seeds} from './Seeds';
import {userSeeds} from './user.seeds';

export const eventSeeds = new Seeds(eventTable.name);

eventSeeds.setData(async () => {
  const users = await userSeeds.getData();
  return Array.from(Array(100).keys()).map((idx) => {
    const startDate = faker.date.between(faker.date.past(), faker.date.future());
    return {
      id: idx + 1,
      startDate,
      endDate: new Date(new Date(startDate).getTime() + Randomizer.getRandomInt(1, 48) * 60 * 60 * 1000),
      creatorId: Randomizer.getRandomArrayValue(users).id,
      title: faker.lorem.words(Randomizer.getRandomInt(1, 8)),
      description: faker.lorem.text(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
  });
});
