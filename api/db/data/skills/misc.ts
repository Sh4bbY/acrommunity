import {SkillType} from '@acrommunity/common';

export const misc = [
  {name: 'Walk in Hands', attachments: ['https://www.youtube.com/watch?v=M9FQHUK8Ibk']},
  {name: 'Toss to Hands', attachments: ['https://www.youtube.com/watch?v=xXdiNGtH5cE']},
  {name: 'Hand to Hand', attachments: ['https://www.youtube.com/watch?v=pXXmSCd2_ts']},
].map(skill => ({
  ...skill,
  type: SkillType.ACROPEUTICS,
}));
