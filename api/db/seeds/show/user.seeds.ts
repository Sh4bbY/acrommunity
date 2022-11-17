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
});

