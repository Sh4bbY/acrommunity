import {SkillType} from '@acrommunity/common';

export const acropeutics = [
  {name: 'Therapeutic Flying', attachments: ['https://www.youtube.com/watch?v=X5_pVZLchtU']},
  {name: 'Beginner Flying Therapeutics', attachments: ['https://www.youtube.com/watch?v=TmrKhyeuCHQ']},
  {name: 'Broken Hammock', attachments: ['https://www.youtube.com/watch?v=OpUm2_TNdyQ']},
  {name: 'Lunar Therapeutic Flight', attachments: ['https://www.youtube.com/watch?v=dGR-1dyVN5I']},
  {name: 'Therapeutic Flight Session', attachments: ['https://www.youtube.com/watch?v=wywteb7B-2k']},
].map(skill => ({
  ...skill,
  type: SkillType.ACROPEUTICS,
}));
