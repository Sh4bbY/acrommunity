import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {WhereOptions} from 'sequelize';
import {Feedback, User} from '~/models';

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
      include: [
        {model: User, attributes: ['username']},
      ],
      limit: query.limit,
      offset: query.offset,
      order: query.order,
    });
  }

  async getFeedback(id: number) {
    return await this.feedbackModel.findByPk(id, {
      include: [
        {model: User, attributes: ['username', 'email', 'avatar']},
      ],
    });
  }
}
