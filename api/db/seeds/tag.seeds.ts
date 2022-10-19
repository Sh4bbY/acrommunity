import {tagTable} from '../tables';
import {poseSeeds} from './pose.seeds';
import {Seeds} from './Seeds';

export const tagSeeds = new Seeds(tagTable.name);

tagSeeds.setData(async () => {
  const tags = await poseSeeds.getMeta('tags');
  const now = new Date();
  const uniqueTags = tags.filter((tag, idx) => tags.findIndex(t => t.name === tag.name) === idx);

  return uniqueTags.map((tag, idx) => {
    return {
      id: idx + 1,
      name: tag.name,
      createdAt: now,
    };
  });
});

