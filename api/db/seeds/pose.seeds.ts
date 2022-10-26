import {faker} from '@faker-js/faker';
import {AliasableType, TaggableType} from '@acrommunity/common';
import {poses} from '../data';
import {poseTable} from '../tables';
import {Seeds} from './Seeds';

export const poseSeeds = new Seeds(poseTable.name);

// see for more poses:
// https://acroyoga757.com/acro-yoga-poses/
// https://www.christiangieger.de/acroyoga-poses/

poseSeeds.setData(async () => {
  return poses.map(pose => ({
    id: pose.id,
    name: pose.name,
    difficulty: pose.difficulty,
    basePosition: pose.basePosition,
    flyerPosition: pose.flyerPosition,
    description: faker.lorem.text(),
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
