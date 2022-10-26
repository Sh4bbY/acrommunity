import {aliasTable} from '../tables/alias.table';
import {flowSeeds} from './flow.seeds';
import {poseSeeds} from './pose.seeds';
import {Seeds} from './Seeds';

export const aliasSeeds = new Seeds(aliasTable.name);

aliasSeeds.setData(async () => {
  const [poseAliases, flowAliases] = await Promise.all([
    poseSeeds.getMeta('aliases'),
    flowSeeds.getMeta('aliases'),
  ]);

  const aliases = poseAliases.concat(flowAliases);

  return aliases.map((alias, idx) => {
    return {
      id: idx + 1,
      aliasableType: alias.aliasableType,
      aliasableId: alias.aliasableId,
      name: alias.name,
    };
  });
});
