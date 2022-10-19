import {acronycFlows} from './acronyc-flows';

export const flows = []
  .concat(acronycFlows)
  .map((pose, idx) => ({...pose, id: idx + 1}));
