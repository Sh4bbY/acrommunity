import {SkillType} from '@acrommunity/common';

export const pops = [
  {name: 'acroyoga pops collection', attachments: ['https://www.youtube.com/watch?v=-LgvinTYuco', 'https://www.youtube.com/watch?v=JmImpFX8srE']},
  {name: 'scissor pops & bird/throne', attachments: ['https://www.youtube.com/watch?v=pUGsSAN6ooo']},
  {name: 'bird/throne', attachments: ['https://www.youtube.com/watch?v=ezttJ-GTcpQ']},
].map(skill => ({
  ...skill,
  type: SkillType.POP,
}));
