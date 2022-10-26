import {mapAttachment} from '../helpers';
import {acropeutics} from './acropeutics';
import {counterBalances} from './counter-balances';
import {drills} from './drills';
import {icarians} from './icarians';
import {pops} from './pops';
import {whips} from './whips';

export const skills = []
  .concat(whips, pops, icarians, drills, counterBalances, acropeutics)
  .map((skill, idx) => ({
    ...skill,
    id: idx + 1,
    attachments: skill.attachments.filter(attachment => !!attachment).map(attachment => mapAttachment(attachment)),
  }));
