import {SkillType} from '@acrommunity/common';

export const counterBalances = [
  {name: 'Counter Balance', attachments: ['https://www.youtube.com/watch?v=Ukg40K5aTLU&t=280s']},
].map(skill => ({
  ...skill,
  type: SkillType.COUNTER_BALANCE,
}));
