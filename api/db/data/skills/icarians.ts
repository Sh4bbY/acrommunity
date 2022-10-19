import {SkillType} from '@acrommunity/common';

export const icarians = [
  {name: 'Bird Icarian', attachments: []},
].map(whip => ({
  ...whip,
  type: SkillType.ICARIAN,
}));

