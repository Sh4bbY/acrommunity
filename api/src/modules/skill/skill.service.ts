import {AliasableType, AttachableType, TaggableType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op, WhereOptions} from 'sequelize';
import {Comment, Skill, Tag} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';
import {AliasService} from '~/modules/alias/alias.service';
import {AttachmentService} from '~/modules/attachment/attachment.service';
import {TagService} from '~/modules/tag/tag.service';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill) private skillModel: typeof Skill,
              private attachmentService: AttachmentService,
              private tagService: TagService,
              private aliasService: AliasService) {
  }

  async getPaginatedData(query: any) {
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
