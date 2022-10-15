import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
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

  async getAll(): Promise<Comment[]> {
    return await this.commentModel.findAll();
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
