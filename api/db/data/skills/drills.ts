import {SkillType} from '@acrommunity/common';

export const drills = [
  {name: 'Partnered Drills & Conditioning', attachments: ['https://www.youtube.com/watch?v=IiCfyK9bwJw']},
  {name: 'Warm up exercises', attachments: ['https://www.youtube.com/watch?v=NAL2z9bqqRM']},
  {name: 'Acro Fitness', attachments: ['https://www.youtube.com/watch?v=PxkasAeRFmQ']},
  {name: 'Beginner Exercises', attachments: ['https://www.youtube.com/watch?v=TCjlkZtkads']},
  {name: 'Partner Workout', attachments: ['https://www.youtube.com/watch?v=KH0VVvox5ak']},
  {name: 'Acroyoga Workout', attachments: ['https://www.youtube.com/watch?v=dqMM23Qm5XU']},
  {name: 'Partner Calibrations', attachments: ['https://www.youtube.com/watch?v=WsT6R0U64Nk']},
  {name: 'Partner Streches', attachments: ['https://www.youtube.com/watch?v=FvIhPcsKj6o', 'https://www.youtube.com/watch?v=tGygck1W62I', 'https://www.youtube.com/watch?v=r-5gSAEGkUk']},
  {name: 'Solo Base Conditioning', attachments: ['https://www.youtube.com/watch?v=RjoVhgNAJZs']},
  {name: 'Partner Crunches', attachments: ['https://www.youtube.com/watch?v=R0r9wjpASQE']},
  {name: 'How To Become A Strong Acroyoga Base', attachments: ['https://www.youtube.com/watch?v=MHIfexupTDQ']},
  {name: 'Partner Conditioning', attachments: ['https://www.youtube.com/watch?v=Q6-ATslxvs8']},
  {name: 'Partner Acrobatic Conditioning', attachments: ['https://www.youtube.com/watch?v=LFWBbeY7SQQ']},
  {name: 'Partner Excercises', attachments: ['https://www.youtube.com/watch?v=GbgIt7dTL2c']},
].map(skill => ({
  ...skill,
  type: SkillType.DRILL,
}));
