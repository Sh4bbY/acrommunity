import {AliasableType, AttachableType, TaggableType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op, WhereOptions} from 'sequelize';
import {Comment, Pose, Tag, Transition} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';
import {AliasService} from '~/modules/alias/alias.service';
import {AttachmentService} from '~/modules/attachment/attachment.service';
import {TagService} from '~/modules/tag/tag.service';

@Injectable()
export class PoseService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition,
    private attachmentService: AttachmentService,
    private tagService: TagService,
    private aliasService: AliasService,
  ) {
  }

  async getPaginatedData(query: any) {
    const where: WhereOptions<Pose> = {};
    if (query.filter.persons) {
      where.persons = query.filter.persons;
    }
    if (query.filter.basePosition) {
      where.basePosition = query.filter.basePosition;
    }
    if (query.filter.flyerPosition) {
      where.flyerPosition = query.filter.flyerPosition;
    }
    if (query.filter.status) {
      where.status = query.filter.status;
    }
    if (query.filter.difficulty) {
      where.difficulty = {
        [Op.and]: [
          {[Op.gte]: query.filter.difficulty[0]},
          {[Op.lte]: query.filter.difficulty[1]},
        ],
      };
    }
    if (query.filter.name) {
      const nameParts = query.filter.name.trim().split(' ').map(part => part.trim());
      where.name = {
        [Op.and]: nameParts.map(part => ({[Op.like]: `%${part}%`})),
      };
    }

    return await this.poseModel.findAndCountAll({
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

  async getOptions() {
    return await this.poseModel.findAll({include: [Attachment]});
  }

  async findPoses(search: string) {
    return await this.poseModel.findAll({
      where: {name: {[Op.like]: `%${search}%`}},
      include: [{
        model: Attachment,
      }],
    });
  }

  async getPose(id: number) {
    const pose: any = await this.poseModel.findOne({
      where: {id},
      include: [Comment, Tag, Attachment, Alias],
    });

    return pose;
  }

  async updatePose(id: number, body: any) {
    const pose: any = await this.poseModel.update(body, {where: {id}});

    const aliases = await this.aliasService.getAliases(AliasableType.Pose, id);
    const newAliases = body.aliases.filter(alias => typeof (alias) === 'string' && !aliases.find(a => a.name === alias));
    const aliasesToDelete = aliases.filter(alias => !body.aliases.includes(alias.name) && !body.aliases.find(a => a.name === alias.name));
    await Promise.all(newAliases.map(alias => this.aliasService.createAlias(alias, AliasableType.Pose, id)));
    await this.aliasService.deleteAliases(aliasesToDelete.map(alias => alias.id));

    const taggables = await this.tagService.getTaggables(TaggableType.Pose, id);
    const newTags = body.tags.filter(tag => typeof (tag) === 'string' && !taggables.find(t => t.tag.name === tag));
    const taggablesToDelete = taggables.filter(taggable => !body.tags.includes(taggable.tag.name) && !body.tags.find(t => t.name === taggable.tag.name));
    await Promise.all(newTags.map(tag => this.tagService.addTag(tag, TaggableType.Pose, id)));
    await Promise.all(taggablesToDelete.map(taggable => this.tagService.deleteTaggable(taggable.taggableType, taggable.taggableId, taggable.tagId)));

    const attachables = await this.attachmentService.getAttachables(AttachableType.Pose, id);
    const newAttachments = body.attachments.filter(attachment => !attachables.find(a => a.attachment.url === attachment.url));
    const attachablesToDelete = attachables.filter(attachable => !body.attachments.includes(attachable.attachment.url) && !body.attachments.find(a => a.url === attachable.attachment.url));
    await Promise.all(newAttachments.map(attachment => this.attachmentService.addAttachment(attachment.url, AttachableType.Pose, id)));
    await Promise.all(attachablesToDelete.map(attachable => this.attachmentService.deleteAttachable(attachable.attachableType, attachable.attachableId, attachable.attachmentId)));

    // TODO: Make Attachment 1:M relation like aliases?! there is probably no need for n:m

    return pose;
  }

  async createPose(body: any) {
    const pose = await this.poseModel.create(body);

    await Promise.all(body.transitionTargets.map(targetPoseId => this.transitionModel.create({sourcePoseId: pose.id, targetPoseId} as any)));
    await Promise.all(body.attachments.map(attachment => this.attachmentService.addAttachment(attachment.url, AttachableType.Pose, pose.id)));
    await Promise.all(body.tags.map(tag => this.tagService.addTag(tag, TaggableType.Pose, pose.id)));
    await Promise.all(body.aliases.map(alias => this.aliasService.createAlias(alias, AliasableType.Pose, pose.id)));

    return pose;
  }

  async getTransitionTargets(poseId: number) {
    const [sourceTransitions, targetTransitions] = await Promise.all([
      this.transitionModel.findAll({attributes: ['sourcePoseId'], where: {targetPoseId: poseId}, raw: true}),
      this.transitionModel.findAll({attributes: ['targetPoseId'], where: {sourcePoseId: poseId}, raw: true}),
    ]);

    const sourceIds = sourceTransitions.map(t => t.sourcePoseId);
    const targetIds = targetTransitions.map(t => t.targetPoseId);

    const [sources, targets] = await Promise.all([
      this.poseModel.findAll({where: {id: {[Op.in]: sourceIds}}, include: [Attachment]}),
      this.poseModel.findAll({where: {id: {[Op.in]: targetIds}}, include: [Attachment]}),
    ]);

    return {sources, targets};
  }

  async updatePoseData(id: number, data) {
    await this.poseModel.update(data, {where: {id}});
  }

  async removeTag(poseId: number, tagId: number) {
    await this.tagService.deleteTaggable(TaggableType.Pose, poseId, tagId);
  }

  async removeAlias(aliasId: number) {
    await this.aliasService.deleteAliases(aliasId);
  }

  async removeTransition(sourcePoseId: number, targetPoseId: number) {
    await this.transitionModel.destroy({where: {sourcePoseId, targetPoseId}});
  }

  async addTag(poseId: number, tag: string) {
    return await this.tagService.addTag(tag, TaggableType.Pose, poseId);
  }

  async addAlias(poseId: number, alias: string) {
    return await this.aliasService.createAlias(alias, AliasableType.Pose, poseId);
  }

  async addAttachment(poseId: number, url: string) {
    return await this.attachmentService.addAttachment(url, AttachableType.Pose, poseId);
  }

  async removeAttachment(poseId: number, attachmentId: number) {
    return await this.attachmentService.deleteAttachable(AttachableType.Pose, poseId, attachmentId);
  }

  async addTransition(sourcePoseId: number, targetPoseId: number) {
    return await this.transitionModel.create({targetPoseId, sourcePoseId} as any);
  }

  async deletePose(id: number) {
    return await this.poseModel.destroy({where: {id}});
  }
}
