import {listTable} from '../tables';
import {Seeds} from './Seeds';

export const listSeeds = new Seeds(listTable.name);

listSeeds.setData(async () => {
  return [{
    id: 1,
    userId: 1,
    name: 'Kann ich gut',
  }, {
    id: 2,
    userId: 1,
    name: 'Will ich lernen',
    icon: 'mdi-star',
  }, {
    id: 3,
    userId: 2,
    name: 'Favoriten',
    icon: 'mdi-heart',
  }];
});
