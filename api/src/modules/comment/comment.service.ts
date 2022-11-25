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

  async getComment(id: number) {
    return await this.commentModel.findByPk(id, {
      include: [
        {model: User, attributes: ['username', 'avatar']},
      ],
    });
  }

  async getPaginatedData(query: any) {
    const where: WhereOptions<Comment> = {};
    return await this.commentModel.findAndCountAll({
      where,
      include: [{model: User, attributes: ['username']}],
      limit: query.limit,
      offset: query.offset,
      order: query.order,
    });
  }

  async getCommentsFor(commentableType: string, commentableId: number): Promise<Comment[]> {
    return await this.commentModel.findAll({
      where: {commentableType, commentableId},
      include: [{model: User, attributes: ['username', 'avatar']}],
      order: [['createdAt', 'DESC']],
      raw: false,
    });
  }
}
