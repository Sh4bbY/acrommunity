import {counterBalances} from './counter-balances';
import {drills} from './drills';
import {icarians} from './icarians';
import {pops} from './pops';
import {relaxations} from './relaxations';
import {whips} from './whips';

export const skills = []
  .concat(whips, pops, icarians, drills, counterBalances, relaxations)
  .map((skill, idx) => ({
    ...skill,
    id: idx + 1,
  }));
