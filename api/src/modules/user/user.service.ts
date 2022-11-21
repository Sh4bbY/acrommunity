import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Flow, List, Pose, Skill, User} from '~/models';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {
  }

  async getPaginatedData(query: any) {
    return this.userModel.findAndCountAll({
      limit: query.limit,
      offset: query.offset,
      order: query.order,
    });
  }

  async getUser(id: number) {
    return await this.userModel.findByPk(id, {
      include: [{
        model: List,
        include: [Pose, Flow, Skill],
      }],
    });
  }
}
