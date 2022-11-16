import {backupData} from '../../data';
import {attachmentTable} from '../../tables';
import {Seeds} from '../Seeds';
import {flowSeeds} from './flow.seeds';
import {poseSeeds} from './pose.seeds';
import {skillSeeds} from './skill.seeds';

export const attachmentSeeds = new Seeds(attachmentTable.name);

if (backupData) {
  attachmentSeeds.setData(backupData.attachments.map(attachment => ({...attachment, createdAt: new Date(attachment.createdAt)})));
} else {
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

}
