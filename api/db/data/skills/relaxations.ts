import {SkillType} from '@acrommunity/common';

export const relaxations = [
  {name: 'Relaxation', attachments: []},
].map(relaxation => ({
  ...relaxation,
  type: SkillType.RELAXATION,
}));
