import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Comment, Skill, Tag} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill) private skillModel: typeof Skill) {
  }

  async getPaginatedData(query: any) {
    return this.skillModel.findAndCountAll({
      limit: query.limit,
      offset: query.offset,
      order: query.order,
      include: [{
        model: Attachment,
      }],
      distinct: true,
    });
  }

  async getSkill(id: number) {
    return await this.skillModel.findOne({
      where: {id},
      include: [Comment, Tag, Attachment, Alias],
    });
  }
}
