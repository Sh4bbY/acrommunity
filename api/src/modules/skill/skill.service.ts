import {AliasableType, AttachableType, MarkableType, MarkType, TaggableType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op, WhereOptions} from 'sequelize';
import {Comment, Skill, Tag} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';
import {AliasService} from '~/modules/alias/alias.service';
import {AttachmentService} from '~/modules/attachment/attachment.service';
import {MyService} from '~/modules/my/my.service';
import {TagService} from '~/modules/tag/tag.service';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill) private skillModel: typeof Skill,
              private attachmentService: AttachmentService,
              private tagService: TagService,
              private aliasService: AliasService,
              private myService: MyService) {
  }

  async getPaginatedData(query: any, user?: any) {
    const where: WhereOptions<Skill> = {};
    if (query.filter?.persons) {
      where.persons = query.filter.persons;
    }
    if (query.filter?.status) {
      where.status = query.filter.status;
    }
    if (query.filter?.type) {
      where.type = {[Op.in]: query.filter.type};
    }
    if (query.filter?.difficulty) {
      where.difficulty = {
        [Op.and]: [
          {[Op.gte]: query.filter.difficulty[0]},
          {[Op.lte]: query.filter.difficulty[1]},
        ],
      };
    }
    if (query.filter?.name) {
      const nameParts = query.filter.name.trim().split(' ').map(part => part.trim());
      where.name = {
        [Op.and]: nameParts.map(part => ({[Op.like]: `%${part}%`})),
      };
    }

    let inIds = [];
    let applyInIds = false;
    let notInIds = [];
    if (query.filter?.favorites && user) {
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.Favorite, MarkableType.Skill);
      if (query.filter.favorites === 'true') {
        inIds = ids;
        applyInIds = true;
      } else {
        notInIds = ids;
      }
    }
    if (query.filter?.repertoire && user) {
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.CanDo, MarkableType.Skill);
      if (query.filter.repertoire === 'true') {
        inIds = inIds.length === 0 ? ids : inIds.filter(id => ids.includes(id));
        applyInIds = true;
      } else {
        notInIds = notInIds.length === 0 ? ids : notInIds.concat(ids);
      }
    }
    if (query.filter?.workingOn && user) {
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.WorkingOn, MarkableType.Skill);
      if (query.filter.workingOn === 'true') {
        inIds = inIds.length === 0 ? ids : inIds.filter(id => ids.includes(id));
        applyInIds = true;
      } else {
        notInIds = notInIds.length === 0 ? ids : notInIds.concat(ids);
      }
    }

    if (applyInIds) {
      where.id = {[Op.in]: inIds};
    }
    if (notInIds.length > 0) {
      if (where.id) {
        where.id[Op.notIn] = notInIds;
      } else {
        where.id = {[Op.notIn]: notInIds};
      }
    }

    return this.skillModel.findAndCountAll({
      where,
      limit: query.limit,
      offset: query.offset,
      order: query.order,
      include: [{
        model: Attachment,
      }],
      distinct: true,
    });
  }

  async create(body: any) {
    const skill = await this.skillModel.create(body);
    await Promise.all(body.tags.map(tag => this.tagService.addTag(tag, TaggableType.Skill, skill.id)));
    await Promise.all(body.aliases.map(alias => this.aliasService.createAlias(alias, AliasableType.Skill, skill.id)));
    await Promise.all(body.attachments.map(attachment => this.attachmentService.addAttachment(attachment.url, AttachableType.Skill, skill.id)));
    return skill;
  }

  async getSkill(id: number) {
    return await this.skillModel.findOne({
      where: {id},
      include: [Comment, Tag, Attachment, Alias],
    });
  }

  async updateSkillData(id: number, data) {
    await this.skillModel.update(data, {where: {id}});
  }

  async addTag(skillId: number, tag: string) {
    return await this.tagService.addTag(tag, TaggableType.Skill, skillId);
  }

  async removeTag(skillId: number, tagId: number) {
    await this.tagService.deleteTaggable(TaggableType.Skill, skillId, tagId);
  }

  async addAlias(skillId: number, alias: string) {
    return await this.aliasService.createAlias(alias, AliasableType.Skill, skillId);
  }

  async removeAlias(aliasId: number) {
    await this.aliasService.deleteAliases(aliasId);
  }

  async addAttachment(skillId: number, url: string) {
    return await this.attachmentService.addAttachment(url, AttachableType.Skill, skillId);
  }

  async removeAttachment(skillId: number, attachmentId: number) {
    return await this.attachmentService.deleteAttachable(AttachableType.Skill, skillId, attachmentId);
  }

  async deleteSkill(id: number) {
    return await this.skillModel.destroy({where: {id}});
  }
}
