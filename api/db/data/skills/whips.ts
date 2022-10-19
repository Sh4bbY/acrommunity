import {SkillType} from '@acrommunity/common';

export const whips = [
  {name: 'Whip', attachments: []},
  {name: 'Back Whip', attachments: []},
  {name: 'Jäger Whip', attachments: []},
  {name: 'Forbidden Whip', attachments: []},
].map(whip => ({
  ...whip,
  type: SkillType.WHIP,
}));
