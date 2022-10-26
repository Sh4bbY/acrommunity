import {attachmentTable} from '../tables/attachment.table';
import {flowSeeds} from './flow.seeds';
import {poseSeeds} from './pose.seeds';
import {Seeds} from './Seeds';
import {skillSeeds} from './skill.seeds';

export const attachmentSeeds = new Seeds(attachmentTable.name);

attachmentSeeds.setData(async () => {
  const poseAttachments = await poseSeeds.getMeta('attachments');
  const flowAttachments = await flowSeeds.getMeta('attachments');
  const skillAttachments = await skillSeeds.getMeta('attachments');

  const attachments = [].concat(poseAttachments, flowAttachments, skillAttachments);
  const now = new Date();

  return attachments.map((attachment, idx) => ({
    id: idx + 1,
    type: attachment.type,
    url: attachment.url,
    createdAt: now,
  }));
});
