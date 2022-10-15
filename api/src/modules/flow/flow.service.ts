import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Comment, Flow, Tag} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';

@Injectable()
export class FlowService {
  constructor(@InjectModel(Flow) private flowModel: typeof Flow) {
  }

  async getPaginatedData(query: any) {
    return this.flowModel.findAndCountAll({
      limit: undefined,
      offset: 0,
      order: ['id'],
    });
  }

  async getFlow(id: number) {
    return await this.flowModel.findOne({
      where: {id},
      include: [Comment, Tag, Attachment, Alias],
    });
  }
}
