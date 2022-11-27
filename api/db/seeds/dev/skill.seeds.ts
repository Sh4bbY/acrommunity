import {AliasableType, PoseStatus, TaggableType} from '@acrommunity/common';
import {backupData, skills} from '../../data';
import {skillTable} from '../../tables';
import {Seeds} from '../Seeds';

export const skillSeeds = new Seeds(skillTable.name);


if (backupData) {
  skillSeeds.setData(backupData.skills.map(skill => ({...skill, persons: 2, status: PoseStatus.Accepted})));
} else {
  skillSeeds.setData(async () => {
    return skills.map((skill: any) => ({
      id: skill.id,
      name: skill.name,
      type: skill.type,
      description: skill.description,
    }));
  });

  skillSeeds.setMeta('attachments', skills.reduce((arr, skill: any) =>
      skill.attachments
        ? arr.concat(skill.attachments.map(attachment => ({...attachment, attachableId: skill.id})))
        : arr,
    []));


  skillSeeds.setMeta('aliases', skills.reduce((arr, skill: any) =>
      skill.aliases
        ? arr.concat(skill.aliases.map(aliasName => ({name: aliasName, aliasableId: skill.id, aliasableType: AliasableType.Skill})))
        : arr,
    []));

  skillSeeds.setMeta('tags', skills.reduce((arr, skill: any) =>
      skill.tags
        ? arr.concat(skill.tags.map(tagName => ({name: tagName, taggableId: skill.id, taggableType: TaggableType.Skill})))
        : arr,
    []));
}
