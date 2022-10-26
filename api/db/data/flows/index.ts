import {mapAttachment} from '../helpers';
import {acronycFlows} from './acronyc-flows';

export const flows = []
  .concat(acronycFlows)
  .map((flow, idx) => ({
    ...flow,
    id: idx + 1,
    attachments: flow.attachments.filter(attachment => !!attachment).map(mapAttachment),
  }));
