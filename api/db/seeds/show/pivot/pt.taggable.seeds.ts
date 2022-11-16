import {flowSeeds, poseSeeds, tagSeeds} from '..';
import {backupData} from '../../../data';
import {PT_Taggable} from '../../../tables/pivot';
import {Seeds} from '../../Seeds';

export const taggableSeeds = new Seeds(PT_Taggable.name);

if (backupData) {
  taggableSeeds.setData(backupData.taggables);
} else {
  taggableSeeds.setData(async () => {
    const [tags, poseTags, flowTags] = await Promise.all([
      tagSeeds.getData(),
      poseSeeds.getMeta('tags'),
      flowSeeds.getMeta('tags'),
    ]);

    const taggables = poseTags.concat(flowTags);
    return taggables.map(taggable => {
      const tag = tags.find(tag => tag.name === taggable.name);
      if (tag) {
        return {tagId: tag.id, taggableId: taggable.taggableId, taggableType: taggable.taggableType};
      } else {
        console.log(`Tag "${taggable.name}" not found!`);
      }
    });
  });
}
