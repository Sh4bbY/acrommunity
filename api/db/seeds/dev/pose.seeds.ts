import {AliasableType, PoseStatus, TaggableType} from '@acrommunity/common';
import {backupData, poses} from '../../data';
import {poseTable} from '../../tables';
import {Seeds} from '../Seeds';

export const poseSeeds = new Seeds(poseTable.name);

// see for more poses:
// https://acroyoga757.com/acro-yoga-poses/

if (backupData) {
  poseSeeds.setData(backupData.poses);
} else {
  poseSeeds.setData(async () => {
    return poses.map(pose => ({
      id: pose.id,
      name: pose.name,
      difficulty: pose.difficulty,
      persons: pose.persons,
      basePosition: pose.basePosition,
      flyerPosition: pose.flyerPosition,
      description: pose.description,
      status: pose.status || PoseStatus.Suggestion,
    }));
  });

  poseSeeds.setMeta('attachments', poses.reduce((arr, pose: any) =>
      pose.attachments
        ? arr.concat(pose.attachments.map(attachment => {
          if (typeof attachment === 'string') {
            return {url: attachment, attachableId: pose.id};
          } else {
            return {...attachment, attachableId: pose.id};
          }
        }))
        : arr,
    []));

  poseSeeds.setMeta('aliases', poses.reduce((arr, pose: any) =>
      pose.aliases
        ? arr.concat(pose.aliases.map(aliasName => ({name: aliasName, aliasableId: pose.id, aliasableType: AliasableType.Pose})))
        : arr,
    []));

  poseSeeds.setMeta('tags', poses.reduce((arr, pose: any) =>
      pose.tags
        ? arr.concat(pose.tags.map(tagName => ({name: tagName, taggableId: pose.id, taggableType: TaggableType.Pose})))
        : arr,
    []));
}
