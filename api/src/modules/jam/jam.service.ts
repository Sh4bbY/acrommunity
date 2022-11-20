import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import moment from 'moment';
import {col, fn, literal, Op} from 'sequelize';
import {Jam, User} from '~/models';

@Injectable()
export class JamService {
  constructor(@InjectModel(Jam) readonly jamModel: typeof Jam) {
  }

  async getJam(id: number) {
    return await this.jamModel.findByPk(id, {include: [User]});
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

  async updateJam(id: number, data) {
    await this.jamModel.update(data, {where: {id}});
    return await this.jamModel.findByPk(id);
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

  getDate(date: string, time: string) {
    const timeParts = time.split(':');
    const hours = Number(timeParts[0]);
    const minutes = Number(timeParts[1]);
    return moment(date).add(hours, 'hours').add(minutes, 'minutes').toDate();
  }
}
