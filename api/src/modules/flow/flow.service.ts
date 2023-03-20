import {AliasableType, AttachableType, FlowStatus, MarkableType, MarkType, TaggableType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op, WhereOptions} from 'sequelize';
import {Comment, Flow, Tag} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';
import {AliasService} from '~/modules/alias/alias.service';
import {AttachmentService} from '~/modules/attachment/attachment.service';
import {MyService} from '~/modules/my/my.service';
import {TagService} from '~/modules/tag/tag.service';

@Injectable()
export class FlowService {
  constructor(
    @InjectModel(Flow) private flowModel: typeof Flow,
    private attachmentService: AttachmentService,
    private tagService: TagService,
    private aliasService: AliasService,
    private myService: MyService,
  ) {
  }

  async createFlow(body: any) {
    const flow = await this.flowModel.create(body);
    await Promise.all(body.tags.map(tag => this.tagService.addTag(tag, TaggableType.Flow, flow.id)));
    await Promise.all(body.aliases.map(alias => this.aliasService.createAlias(alias, AliasableType.Flow, flow.id)));
    await Promise.all(body.attachments.map(attachment => this.attachmentService.addAttachment(attachment.url, AttachableType.Flow, flow.id)));
    return flow;
  }

  async getPaginatedData(query: any, user?: any) {
    const where: WhereOptions<Flow> = {
      status: FlowStatus.Accepted,
    };
    if (query.filter?.status) {
      where.status = query.filter.status;
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
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.Favorite, MarkableType.Flow);
      if (query.filter.favorites === 'true') {
        inIds = ids;
        applyInIds = true;
      } else {
        notInIds = ids;
      }
    }
    if (query.filter?.repertoire && user) {
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.CanDo, MarkableType.Flow);
      if (query.filter.repertoire === 'true') {
        inIds = inIds.length === 0 ? ids : inIds.filter(id => ids.includes(id));
        applyInIds = true;
      } else {
        notInIds = notInIds.length === 0 ? ids : notInIds.concat(ids);
      }
    }
    if (query.filter?.workingOn && user) {
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.WorkingOn, MarkableType.Flow);
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

    return this.flowModel.findAndCountAll({
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

  async getFlow(id: number) {
    return await this.flowModel.findOne({
      where: {id},
      include: [Comment, Tag, Attachment, Alias],
    });
  }

  async updateFlowData(id: number, data) {
    await this.flowModel.update(data, {where: {id}});
  }

  async addTag(flowId: number, tag: string) {
    return await this.tagService.addTag(tag, TaggableType.Flow, flowId);
  }

  async removeTag(flowId: number, tagId: number) {
    await this.tagService.deleteTaggable(TaggableType.Flow, flowId, tagId);
  }

  async addAlias(flowId: number, alias: string) {
    return await this.aliasService.createAlias(alias, AliasableType.Flow, flowId);
  }

  async removeAlias(aliasId: number) {
    await this.aliasService.deleteAliases(aliasId);
  }

  async addAttachment(flowId: number, url: string) {
    return await this.attachmentService.addAttachment(url, AttachableType.Flow, flowId);
  }

  async removeAttachment(flowId: number, attachmentId: number) {
    return await this.attachmentService.deleteAttachable(AttachableType.Flow, flowId, attachmentId);
  }

  async deleteFlow(id: number) {
    return await this.flowModel.destroy({where: {id}});
  }
}
