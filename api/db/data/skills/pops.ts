import {SkillType} from '@acrommunity/common';

export const pops = [
  {name: 'Bird Pop', attachments: []},
].map(skill => ({
  ...skill,
  type: SkillType.POP,
}));
