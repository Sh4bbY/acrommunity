import {SkillType} from '@acrommunity/common';

export const drills = [
  {name: 'Custom drill', attachments: []},
].map(skill => ({
  ...skill,
  type: SkillType.DRILL,
}));
