import {Crypt} from '~/utils';
import {userTable} from '../../tables';
import {Seeds} from '../Seeds';

export const userSeeds = new Seeds(userTable.name);

userSeeds.setData(async () => {
  const password = await Crypt.hashPassword('secret');
  const now = new Date();
  return [{
    id: 1,
    username: 'ShabbY',
    avatar: '/assets/img/profile/default.png',
    email: 'sascha.bialon@shabbtech.com',
    isAdmin: true,
    password,
    createdAt: now,
    updatedAt: now,
  }, {
    id: 2,
    username: 'Nici',
    avatar: '/assets/img/profile/default.png',
    email: 'n.stegert@gmail.com',
    isAdmin: false,
    password,
    createdAt: now,
    updatedAt: now,
  }, {
    id: 3,
    username: 'Gast',
    avatar: '/assets/img/profile/default.png',
    email: 'gast@acrommunity.de',
    isAdmin: false,
    password: await Crypt.hashPassword('gast123'),
    createdAt: now,
    updatedAt: now,
  }];
});

