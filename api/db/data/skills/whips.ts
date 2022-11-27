import {SkillType} from '@acrommunity/common';

export const whips = [
  {name: 'Tarzan', attachments: ['https://www.youtube.com/watch?v=OvTyUTMmsmA', 'https://www.youtube.com/watch?v=SfMmHT4jAmo', 'https://www.youtube.com/watch?v=ZVNbNWR0D4M']},
  {name: 'Back Whip Exit', attachments: ['https://www.youtube.com/watch?v=swooazy2Iy8']},
  {name: 'Reverse Throne Back Whip', attachments: ['https://www.youtube.com/watch?v=GhIfKbdHDsc', 'https://www.youtube.com/watch?v=BW5lbZZaeQU']},
  {name: 'Jäger Whip', attachments: ['https://www.youtube.com/watch?v=S2XCtQrdeFQ', 'https://www.youtube.com/watch?v=O-NlIbgGLcM']},
  {name: 'Forbidden Whip', attachments: ['https://www.youtube.com/watch?v=Cw4mnHzZkHc']},
].map(skill => ({
  ...skill,
  type: SkillType.WHIP,
}));
