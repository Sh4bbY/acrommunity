import {AttachableType} from '~/enums';
import {flowSeeds, poseSeeds} from '..';
import {PT_Attachable} from '../../tables/pivot';
import {attachmentSeeds} from '../attachment.seeds';
import {Seeds} from '../Seeds';

export const attachableSeeds = new Seeds(PT_Attachable.name);

attachableSeeds.setData(async () => {
  const [attachments, poseAttachments, flowAttachments] = await Promise.all([
    attachmentSeeds.getData(),
    poseSeeds.getMeta('attachments'),
    flowSeeds.getMeta('attachments'),
  ]);

  let attachables = poseAttachments.map(poseAttachment => ({
    attachableType: AttachableType.Pose,
    attachableId: poseAttachment.attachableId,
    attachmentId: attachments.find(attachment => attachment.url === poseAttachment.url).id,
  }));

  attachables = attachables.concat(flowAttachments.map(flowAttachment => ({
    attachableType: AttachableType.Flow,
    attachableId: flowAttachment.attachableId,
    attachmentId: attachments.find(attachment => attachment.url === flowAttachment.url).id,
  })));

  return attachables;
});
