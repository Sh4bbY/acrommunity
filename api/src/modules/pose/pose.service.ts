import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op} from 'sequelize';
import {Comment, Pose, Tag, Transition} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';

@Injectable()
export class PoseService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition) {
  }

  async getPaginatedData(query: any) {
    return await this.poseModel.findAndCountAll({
      limit: query.limit,
      offset: query.offset,
      order: query.order,
      include: [{
        model: Attachment,
      }],
      distinct: true,
    });
  }

  async getPose(id: number) {
    const pose: any = await this.poseModel.findOne({
      where: {id},
      include: [Comment, Tag, Attachment, Alias],
    });

    return pose;
  }

  async getTransitionTargets(poseId: number) {
    const transitions = await this.transitionModel.findAll({
      attributes: ['sourcePoseId', 'targetPoseId'], where: {
        [Op.or]: [
          {targetPoseId: poseId},
          {sourcePoseId: poseId},
        ],
      }, raw: true,
    });

    const poseIds = transitions.map(transition => poseId === transition.sourcePoseId ? transition.targetPoseId : transition.sourcePoseId);
    return await this.poseModel.findAll({
      where: {id: {[Op.in]: poseIds}},
      raw: true,
    });
  }
}
