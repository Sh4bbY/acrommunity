import {ListableType} from '../enums';
import {IList} from '../models';

export function getListables(list: IList, type: ListableType) {
  switch (type) {
    case ListableType.Pose:
      return list.poses;
    case ListableType.Flow:
      return list.flows;
    case ListableType.Skill:
      return list.skills;
    default:
      return [];
  }
}
