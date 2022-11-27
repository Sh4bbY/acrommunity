import {SkillType} from '@acrommunity/common';

export const icarians = [
  {name: 'Martini', attachments: ['https://www.youtube.com/watch?v=sB6Pfgn8dE0', 'https://www.instagram.com/p/BnUB6xvnDHW']},
  {name: 'Front Tuck', attachments: ['https://www.youtube.com/shorts/vLCrl119Dxk', 'https://www.youtube.com/watch?v=k-c6iTdqV6w']},
  {name: 'Acroyoga Pops Flow (Castaway, Pop To Foot-To-Foot, Front Tuck Pop)', attachments: ['https://www.youtube.com/watch?v=ouadmkk8YYA']},
  {
    name: 'Castaway',
    attachments: ['https://www.youtube.com/watch?v=WyoWR_lQ6yU', 'https://www.youtube.com/watch?v=1X3MhJVXmoc', 'https://www.youtube.com/shorts/sFZoigL_8Ww', 'https://www.youtube.com/watch?v=pgCpDDRBtfA', 'https://www.youtube.com/watch?v=zUM8d9ORnjw'],
  },
].map(skill => ({
  ...skill,
  type: SkillType.ICARIAN,
}));

