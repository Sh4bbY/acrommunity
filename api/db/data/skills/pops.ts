import {SkillType} from '@acrommunity/common';

export const pops = [
  {name: 'Bird Pop', attachments: []},
].map(whip => ({
  ...whip,
  type: SkillType.POP,
}));
