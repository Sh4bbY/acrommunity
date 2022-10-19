import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Jam} from '~/models';

@Injectable()
export class JamService {
  constructor(@InjectModel(Jam) readonly jamModel: typeof Jam) {
  }

  async getJam(id: number) {
    return await this.jamModel.findOne({where: {id}});
  }

  async getPaginatedData(data) {
    return await this.jamModel.findAndCountAll({
      limit: undefined,
      offset: 0,
      order: ['id'],
    });
  }

  async createJam(data) {
    const result = await this.jamModel.create(data);
    console.log(result);
    return result;
  }
}
