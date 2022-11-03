import {IFlowGeneratorSettings} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {literal, Op, WhereOptions} from 'sequelize';
import {Pose, Transition} from '~/models';
import {Attachment} from '~/models/Attachment';

@Injectable()
export class FlowGeneratorService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition) {
  }

  async generate(settings: IFlowGeneratorSettings) {
    const where = this.setupWhereConditions(settings);
    const startPose = await this.getStartPose(settings, where);
    // const endPose = await this.getEndPose(settings, where, startPose);

    let poseCount = 1;
    const poses = [];
    let pose = startPose;
    console.log('start', pose.getDataValue('name'));
    while (poseCount < settings.numberPoses) {
      pose = await this.getFollowUpPose(pose.id, where);
      poses.push(pose);
      console.log('next', pose.getDataValue('name'));
      poseCount++;
    }

    return [startPose, ...poses]; //, endPose];
  }

  setupWhereConditions(settings: IFlowGeneratorSettings): WhereOptions<Pose> {
    const where: WhereOptions<Pose> = {};
    if (settings.basePositions.length > 0) {
      where.basePosition = {[Op.in]: settings.basePositions};
    }
    if (settings.flyerPositions.length > 0) {
      where.flyerPosition = {[Op.in]: settings.flyerPositions};
    }
    if (settings.difficulty.length === 2) {
      where.difficulty = {
        [Op.and]: [
          {[Op.gte]: settings.difficulty[0]},
          {[Op.lte]: settings.difficulty[1]},
        ],
      };
    }
    return where;
  }

  async getStartPose(settings: IFlowGeneratorSettings, where) {
    if (settings.startPoseId) {
      return await this.getPose({id: settings.startPoseId});
    }
    return await this.getPose(where);
  }

  async getEndPose(settings: IFlowGeneratorSettings, where, startPose: Pose) {
    if (settings.isWashingMachine) {
      return startPose;
    }
    if (settings.endPoseId) {
      return this.getPose({id: settings.endPoseId});
    }
    return this.getPose(where);
  }

  async getPose(where?: any) {
    if (where.id) {
      return await this.poseModel.findOne({where, include: [Attachment]});
    } else {
      const poses = await this.poseModel.findAll({where, order: [literal('rand()')], limit: 1, include: [Attachment]});
      return poses[0];
    }
  }

  async getFollowUpPose(sourcePoseId: number, where?: any) {
    const transitions = await this.transitionModel.findAll({where: {sourcePoseId}});
    const targetIds = transitions.map(t => t.targetPoseId);
    where.id = {[Op.in]: targetIds};
    const poses = await this.poseModel.findAll({
      where,
      include: [Attachment], order: [literal('rand()')], limit: 1,
    });
    return poses[0];
  }
}
