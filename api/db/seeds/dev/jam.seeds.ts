import {JamStatus, RecursionType} from '@acrommunity/common';
import {faker} from '@faker-js/faker';
import {fn} from 'sequelize';
import {Randomizer} from '~/utils';
import {jamTable} from '../../tables';
import {Seeds} from '../Seeds';
import {userSeeds} from './user.seeds';

export const jamSeeds = new Seeds(jamTable.name);

jamSeeds.setData(async () => {
  const users = await userSeeds.getData();
  const now = new Date();
  return Array.from(Array(1000).keys()).map((idx) => {
    const startDate = faker.date.between(faker.date.past(), now);
    const latlng = faker.address.nearbyGPSCoordinate([50.0009442, 8.5676846], 1000);
    return {
      id: idx + 1,
      startDate,
      endDate: new Date(new Date(startDate).getTime() + Randomizer.getRandomInt(1, 4) * 60 * 60 * 1000),
      creatorId: Randomizer.getRandomArrayValue(users).id,
      latlng: fn('ST_GeomFromText', `POINT(${latlng[0]} ${latlng[1]})`),
      address: faker.address.streetAddress(),
      locationInfo: faker.lorem.words(10),
      contact: faker.phone.number(),
      recursionType: Randomizer.getRandomArrayValue(Object.values(RecursionType)),
      title: faker.lorem.words(Randomizer.getRandomInt(1, 8)),
      description: faker.lorem.text(),
      status: JamStatus.OK,
      createdAt: now,
      updatedAt: now,
    };
  });
});
