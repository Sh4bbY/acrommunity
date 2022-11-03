import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Video} from '~/models';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private imageModel: typeof Video,
  ) {
  }

  async getPaginatedData(query: any) {
    return await this.imageModel.findAndCountAll({
      where: query.filter,
      limit: query.limit,
      offset: query.offset,
      order: query.order,
    });
  }

  async getVideo(id: number) {
    return await this.imageModel.findOne({where: {id}});
  }
}
