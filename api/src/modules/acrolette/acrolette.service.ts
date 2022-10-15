import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {literal, Op, WhereOptions} from 'sequelize';
import {Pose, Transition} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';

@Injectable()
export class AcroletteService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition) {
  }

  async getRandomPose(poseId?: string) {
    const where: WhereOptions<Pose> = {};
    if (poseId) {
      where.id = {[Op.not]: Number(poseId)};
    }
    const poses = await this.poseModel.findAll({
      where,
      include: [Attachment, Alias],
      order: [literal('rand()')],
      limit: 1,
    });

    return poses[0];
  }
}
