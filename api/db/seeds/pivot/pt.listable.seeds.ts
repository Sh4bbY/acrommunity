import {ListableType} from '~/enums';
import {flowSeeds, listSeeds, poseSeeds} from '..';
import {PT_Listable} from '../../tables/pivot';
import {Seeds} from '../Seeds';
import {skillSeeds} from '../skill.seeds';

export const listableSeeds = new Seeds(PT_Listable.name);

listableSeeds.setData(async () => {
  const [lists, poses, flows, skills] = await Promise.all([
    listSeeds.getData(),
    poseSeeds.getData(),
    flowSeeds.getData(),
    skillSeeds.getData(),
  ]);

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
    {
      listId: 1,
      listableType: ListableType.Pose,
      listableId: 4,
    },
    {
      listId: 1,
      listableType: ListableType.Pose,
      listableId: 5,
    },
    {
      listId: 1,
      listableType: ListableType.Skill,
      listableId: 5,
    },
    {
      listId: 1,
      listableType: ListableType.Flow,
      listableId: 5,
    },
    {
      listId: 2,
      listableType: ListableType.Pose,
      listableId: 15,
    },
    {
      listId: 2,
      listableType: ListableType.Skill,
      listableId: 5,
    },
    {
      listId: 2,
      listableType: ListableType.Flow,
      listableId: 22,
    },
  ];
});
