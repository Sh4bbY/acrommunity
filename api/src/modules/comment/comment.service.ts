import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {WhereOptions} from 'sequelize';
import {Comment, User} from '~/models';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentModel: typeof Comment,
  ) {
  }

  async create(commentData: any) {
    return await this.commentModel.create(commentData);
  }


  async getPaginatedData(query: any) {
    const where: WhereOptions<Comment> = {};
    return await this.commentModel.findAndCountAll({
      where,
      limit: query.limit,
      offset: query.offset,
      order: query.order,
    });
  }

  async getCommentsFor(commentableType: string, commentableId: number): Promise<Comment[]> {
    return await this.commentModel.findAll({
      where: {commentableType, commentableId},
      include: [User],
      order: [['createdAt', 'DESC']],
      raw: false,
    });
  }
}
