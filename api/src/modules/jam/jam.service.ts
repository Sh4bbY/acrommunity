import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {col, fn, literal, Op} from 'sequelize';
import {Jam, User} from '~/models';

@Injectable()
export class JamService {
  constructor(@InjectModel(Jam) readonly jamModel: typeof Jam) {
  }

  async getJam(id: number) {
    return await this.jamModel.findOne({where: {id}, include: [User]});
  }

  async getPaginatedData() {
    return await this.jamModel.findAndCountAll({
      limit: undefined,
      offset: 0,
      order: ['id'],
    });
  }

  async createJam(data) {
    return await this.jamModel.create(data);
  }

  async searchJams(query) {
    const latitude = query.position[0];
    const longitude = query.position[1];

    return await this.jamModel.findAll({
      attributes: {
        include: [
          [fn('ST_Distance_Sphere', col('latlng'), fn('ST_GeomFromText', `POINT(${latitude} ${longitude})`)), 'distance'],
        ],
      },
      having: {
        distance: {[Op.lte]: query.distance},
      },
      order: literal('distance ASC'),
    });
  }

}
