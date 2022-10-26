import {SkillType} from '@acrommunity/common';

export const counterBalances = [
  {name: 'Counter Balance', attachments: []},
].map(skill => ({
  ...skill,
  type: SkillType.COUNTER_BALANCE,
}));
