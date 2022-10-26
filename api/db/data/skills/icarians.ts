import {SkillType} from '@acrommunity/common';

export const icarians = [
  {name: 'Martini', attachments: ['https://www.instagram.com/p/BnUB6xvnDHW']},
].map(skill => ({
  ...skill,
  type: SkillType.ICARIAN,
}));

