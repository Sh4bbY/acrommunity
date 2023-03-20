import {MarkableType, MarkType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op, WhereOptions} from 'sequelize';
import {Video} from '~/models';
import {MyService} from '~/modules/my/my.service';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private imageModel: typeof Video,
    private myService: MyService,
  ) {
  }

  async getPaginatedData(query: any, user?: any) {
    const where: WhereOptions<Video> = {};

    if (query.filter?.persons) {
      where.persons = query.filter.persons;
    }
    if (query.filter?.bases) {
      where.bases = query.filter.bases;
    }
    if (query.filter?.baseType) {
      where.baseType = query.filter.baseType;
    }

    let inIds = [];
    let applyInIds = false;
    let notInIds = [];
    if (query.filter?.favorites && user) {
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.Favorite, MarkableType.Video);
      if (query.filter.favorites === 'true') {
        inIds = ids;
        applyInIds = true;
      } else {
        notInIds = ids;
      }
    }
    if (query.filter?.repertoire && user) {
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.CanDo, MarkableType.Video);
      if (query.filter.repertoire === 'true') {
        inIds = inIds.length === 0 ? ids : inIds.filter(id => ids.includes(id));
        applyInIds = true;
      } else {
        notInIds = notInIds.length === 0 ? ids : notInIds.concat(ids);
      }
    }
    if (query.filter?.workingOn && user) {
      const ids = await this.myService.getMarkedItemIds(user.id, MarkType.WorkingOn, MarkableType.Video);
      if (query.filter.workingOn === 'true') {
        inIds = inIds.length === 0 ? ids : inIds.filter(id => ids.includes(id));
        applyInIds = true;
      } else {
        notInIds = notInIds.length === 0 ? ids : notInIds.concat(ids);
      }
    }

    if (applyInIds) {
      where.id = {[Op.in]: inIds};
    }
    if (notInIds.length > 0) {
      if (where.id) {
        where.id[Op.notIn] = notInIds;
      } else {
        where.id = {[Op.notIn]: notInIds};
      }
    }

    return await this.imageModel.findAndCountAll({
      where,
      limit: query.limit,
      offset: query.offset,
      order: query.order,
    });
  }

  async getVideo(id: number) {
    return await this.imageModel.findOne({where: {id}});
  }
}
