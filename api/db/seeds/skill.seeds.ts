import {faker} from '@faker-js/faker';
import {skills} from '../data';
import {skillTable} from '../tables';
import {Seeds} from './Seeds';

export const skillSeeds = new Seeds(skillTable.name);

skillSeeds.setData(async () => {
  return skills.map((skill: any) => ({
    id: skill.id,
    name: skill.name,
    type: skill.type,
    description: skill.description || faker.lorem.text(),
  }));
});
