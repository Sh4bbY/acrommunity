import {backupData} from '../../data';
import {aliasTable} from '../../tables';
import {Seeds} from '../Seeds';
import {flowSeeds} from './flow.seeds';
import {poseSeeds} from './pose.seeds';

export const aliasSeeds = new Seeds(aliasTable.name);

if (backupData) {
  aliasSeeds.setData(backupData.aliases);
} else {
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
}
