import {PoseStatus} from '@acrommunity/common';
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

  async getPoseOptions() {
    return await this.poseModel.findAll({where: {persons: 2, status: PoseStatus.Accepted}});
  }

  async getRandomPose(query: any) {
    const currentPoseId = query.current ? Number(query.current) : null;
    const where: WhereOptions<Pose> = {persons: 2, status: PoseStatus.Accepted};

    if (query.startPoseId) {
      return await this.poseModel.findOne({
        where: {...where, id: query.startPoseId},
        include: [Attachment, Alias],
      });
    }

    if (currentPoseId) {
      const transitions = await this.transitionModel.findAll({
        where: {
          [Op.or]: {
            sourcePoseId: currentPoseId,
            targetPoseId: currentPoseId,
          },
        },
      });
      const transitionIds = transitions.map(transition => transition.targetPoseId !== currentPoseId ? transition.targetPoseId : transition.sourcePoseId);
      where.id = {
        [Op.in]: transitionIds,
        [Op.not]: currentPoseId,
      };
    }

    if (query.difficulty) {
      where.difficulty = {
        [Op.and]: {
          [Op.gte]: Number(query.difficulty[0]),
          [Op.lte]: Number(query.difficulty[1]),
        },
      };
    }
    if (query.basePositions) {
      where.basePosition = {[Op.in]: query.basePositions};
    }
    if (query.flyerPositions) {
      where.flyerPosition = {[Op.in]: query.flyerPositions};
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
