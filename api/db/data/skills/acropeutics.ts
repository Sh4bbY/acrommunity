import {SkillType} from '@acrommunity/common';

export const acropeutics = [
  {name: 'Acropeutics', attachments: []},
].map(skill => ({
  ...skill,
  type: SkillType.ACROPEUTICS,
}));
