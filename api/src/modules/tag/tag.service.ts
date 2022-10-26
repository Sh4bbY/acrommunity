import {TaggableType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Tag} from '~/models';
import {PT_Taggable} from '~/models/pivot';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag) private tagModel: typeof Tag,
    @InjectModel(PT_Taggable) private ptTaggableModel: typeof PT_Taggable) {
  }

  async addTag(name: string, taggableType: TaggableType, taggableId: number) {
    name = name.toLowerCase();

    let tag = await this.tagModel.findOne({where: {name}});
    if (!tag) {
      const record = {name} as any;
      tag = await this.tagModel.create(record);
    }

    const entry = {tagId: tag.id, taggableType, taggableId} as any;
    await this.ptTaggableModel.create(entry);
  }

  async getTaggables(taggableType: TaggableType, taggableId: number) {
    const taggables = await this.ptTaggableModel.findAll({where: {taggableType, taggableId}, include: [Tag]});
    return taggables.map(taggable => taggable.get({plain: true}));
  }

  async deleteTaggable(taggableType: TaggableType, taggableId: number, tagId: number) {
    await this.ptTaggableModel.destroy({where: {taggableType, taggableId, tagId}});
  }
}
