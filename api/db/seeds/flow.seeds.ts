import {faker} from '@faker-js/faker';
import {AliasableType, TaggableType} from '~/enums';
import {flows} from '../data';
import {flowsTable} from '../tables/flows.table';
import {Seeds} from './Seeds';

export const flowSeeds = new Seeds(flowsTable.name);

flowSeeds.setData(async () => {
  return flows.map((flow, idx) => ({
    id: idx + 1,
    name: flow.name,
    difficulty: flow.difficulty,
    description: faker.lorem.text(),
  }));
});


flowSeeds.setMeta('attachments', flows.reduce((arr, flow: any) =>
    flow.attachments
      ? arr.concat(flow.attachments.map(attachment => ({...attachment, attachableId: flow.id, name: flow.name + ' Video'})))
      : arr,
  []));


flowSeeds.setMeta('aliases', flows.reduce((arr, flow: any) =>
    flow.aliases
      ? arr.concat(flow.aliases.map(aliasName => ({name: aliasName, aliasableId: flow.id, aliasableType: AliasableType.Flow})))
      : arr,
  []));

flowSeeds.setMeta('tags', flows.reduce((arr, flow: any) =>
    flow.tags
      ? arr.concat(flow.tags.map(tagName => ({name: tagName, taggableId: flow.id, taggableType: TaggableType.Flow})))
      : arr,
  []));
