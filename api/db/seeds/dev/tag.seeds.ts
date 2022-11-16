import {backupData} from '../../data';
import {tagTable} from '../../tables';
import {Seeds} from '../Seeds';
import {poseSeeds} from './pose.seeds';

export const tagSeeds = new Seeds(tagTable.name);

if (backupData) {
  tagSeeds.setData(backupData.tags.map(tag => ({id: tag.id, name: tag.name})));
} else {
  tagSeeds.setData(async () => {
    const tags = await poseSeeds.getMeta('tags');
    const uniqueTags = tags.filter((tag, idx) => tags.findIndex(t => t.name === tag.name) === idx);

    return uniqueTags.map((tag, idx) => {
      return {
        id: idx + 1,
        name: tag.name,
      };
    });
  });
}
