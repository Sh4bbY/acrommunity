import {SkillType} from '@acrommunity/common';

export const drills = [
  {name: 'Custom drill', attachments: []},
].map(whip => ({
  ...whip,
  type: SkillType.DRILL,
}));
