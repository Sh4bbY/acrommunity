import {AttachableType} from '@acrommunity/common';
import {backupData} from '../../../data';
import {PT_Attachable} from '../../../tables/pivot';
import {Seeds} from '../../Seeds';
import {attachmentSeeds} from '../attachment.seeds';
import {flowSeeds, poseSeeds} from '../index';
import {skillSeeds} from '../skill.seeds';

export const attachableSeeds = new Seeds(PT_Attachable.name);

if (backupData) {
  attachableSeeds.setData(backupData.attachables);
} else {
  attachableSeeds.setData(async () => {
    const [attachments, poseAttachments, flowAttachments, skillAttachments] = await Promise.all([
      attachmentSeeds.getData(),
      poseSeeds.getMeta('attachments'),
      flowSeeds.getMeta('attachments'),
      skillSeeds.getMeta('attachments'),
    ]);

    const attachmentGroups = [
      {attachableType: AttachableType.Pose, attachables: poseAttachments},
      {attachableType: AttachableType.Flow, attachables: flowAttachments},
      {attachableType: AttachableType.Skill, attachables: skillAttachments},
    ];

    console.log('skillAttachments', skillAttachments);

    return attachmentGroups.reduce((arr, group) => arr.concat(group.attachables.map(attachable => ({
      attachableType: group.attachableType,
      attachableId: attachable.attachableId,
      attachmentId: attachments.find(attachment => attachment.url === attachable.url).id,
    }))), []);
  });

}
