import {AttachmentType} from '~/enums';
import {attachmentTable} from '../tables/attachment.table';
import {flowSeeds} from './flow.seeds';
import {poseSeeds} from './pose.seeds';
import {Seeds} from './Seeds';

export const attachmentSeeds = new Seeds(attachmentTable.name);

function getNameFromUrl(url: string) {
  let idx = url.lastIndexOf('/');
  const tail = url.substr(idx + 1);
  idx = tail.lastIndexOf('.');
  return tail.substring(0, idx);
}

attachmentSeeds.setData(async () => {
  const poseAttachments = await poseSeeds.getMeta('attachments');
  const flowAttachments = await flowSeeds.getMeta('attachments');

  const now = new Date();
  let attachments = poseAttachments.map((attachment, idx) => {
    return {
      id: idx + 1,
      type: AttachmentType.Picture,
      name: attachment.name || getNameFromUrl(attachment.url),
      url: attachment.url,
      createdAt: now,
    };
  });

  attachments = attachments.concat(flowAttachments.map((attachment, idx) => {
    return {
      id: attachments.length + idx + 1,
      type: attachment.type,
      name: attachment.name,
      url: attachment.url,
      createdAt: now,
    };
  }));

  return attachments;
});
