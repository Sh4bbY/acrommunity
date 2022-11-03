import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Image} from '~/models';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image) private imageModel: typeof Image,
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

  async getImage(id: number) {
    return await this.imageModel.findOne({where: {id}});
  }
}
