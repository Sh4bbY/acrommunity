import {SkillType} from '@acrommunity/common';

export const counterBalances = [
  {name: 'Counter Balance', attachments: []},
].map(counterBalance => ({
  ...counterBalance,
  type: SkillType.COUNTER_BALANCE,
}));
