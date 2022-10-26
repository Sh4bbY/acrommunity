import {ListableType} from '@acrommunity/common';
import {PT_Listable} from '../../tables/pivot';
import {Seeds} from '../Seeds';

export const listableSeeds = new Seeds(PT_Listable.name);

listableSeeds.setData(async () => {
  return [
    {
      listId: 1,
      listableType: ListableType.Pose,
      listableId: 1,
    },
    {
      listId: 1,
      listableType: ListableType.Pose,
      listableId: 2,
    },
    {
      listId: 1,
      listableType: ListableType.Pose,
      listableId: 3,
    },
  ];
});
