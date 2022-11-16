import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {WhereOptions} from 'sequelize';
import {Feedback} from '~/models';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback) private feedbackModel: typeof Feedback,
  ) {
  }

  async create(feedbackData: any) {
    return await this.feedbackModel.create(feedbackData);
  }


  async getPaginatedData(query: any) {
    const where: WhereOptions<Feedback> = {};
    return await this.feedbackModel.findAndCountAll({
      where,
      limit: query.limit,
      offset: query.offset,
      order: query.order,
    });
  }
}
