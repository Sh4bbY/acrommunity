import {faker} from '@faker-js/faker';
import {Crypt} from '~/utils';
import {userTable} from '../../tables';
import {Seeds} from '../Seeds';

export const userSeeds = new Seeds(userTable.name);

userSeeds.setData(async () => {
  const password = await Crypt.hashPassword('secret');
  const now = new Date();
  const users = [{
    id: 1,
    username: 'ShabbY',
    avatar: '/assets/img/profile/default.png',
    email: 'sascha.bialon@shabbtech.com',
    role: 'admin',
    password,
    createdAt: now,
    updatedAt: now,
  }, {
    id: 2,
    username: 'Nici',
    avatar: '/assets/img/profile/default.png',
    email: 'n.stegert@gmail.com',
    role: 'user',
    password,
    createdAt: now,
    updatedAt: now,
  }, {
    id: 3,
    username: 'Gast',
    avatar: '/assets/img/profile/default.png',
    email: 'gast@acrommunity.de',
    role: 'user',
    password: await Crypt.hashPassword('gast123'),
    createdAt: now,
    updatedAt: now,
  }];

  for (let i = users.length + 1; i <= 100; i++) {
    users.push({
      id: i,
      username: faker.helpers.unique(faker.internet.userName),
      email: faker.helpers.unique(faker.internet.email),
      role: 'user',
      password,
      avatar: '/assets/img/profile/default.png',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
  }
  return users;
});

// const postSeedUpdates = [];
// for (let i = 1; i <= 1000; i++) {
//   postSeedUpdates.push({
//     where: {id: i},
//     data: {
//       contactProfileId: i,
//       authorProfileId: i,
//       eLearningAccountId: i,
//       ltmsAccountId: i,
//     },
//   });
// }
// userSeeds.setPostSeedingUpdates(postSeedUpdates);
