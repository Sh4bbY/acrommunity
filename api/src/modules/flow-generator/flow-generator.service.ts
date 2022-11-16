import {IFlowGeneratorSettings, Status} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op, WhereOptions} from 'sequelize';
import {Pose, Transition} from '~/models';
import {Attachment} from '~/models/Attachment';
import {Graph} from '~/modules/flow-generator/Graph';
import {Randomizer} from '~/utils';

@Injectable()
export class FlowGeneratorService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition) {
  }

  async getPoseOptions() {
    return await this.poseModel.findAll({where: {persons: 2, status: Status.Accepted}});
  }

  async generate(settings: IFlowGeneratorSettings) {
    const where = this.setupWhereConditions(settings);
    const poseRecords = await this.poseModel.findAll({where, include: [Attachment]});
    const poses = poseRecords.map(poseRecord => poseRecord.get({plain: true}));
    const poseIds = poses.map(pose => pose.id);
    const transitions = await this.transitionModel.findAll({where: {sourcePoseId: {[Op.in]: poseIds}, targetPoseId: {[Op.in]: poseIds}}, raw: true});

    const startPose = settings.startPoseId ? poses.find(pose => pose.id === settings.startPoseId) : Randomizer.getRandomArrayValue(poses);

    if (settings.endPoseId) {
      const endPose = settings.endPoseId ? poses.find(pose => pose.id === settings.endPoseId) : Randomizer.getRandomArrayValue(poses);
      const graph = new Graph(poses, transitions);
      return graph.findPath(startPose.id, endPose.id, settings.numberPoses);
    } else {
      const flow = [startPose];
      let pose = startPose;
      while (flow.length < settings.numberPoses) {
        pose = this.getFollowUpPose(pose, flow, transitions, poses);
        flow.push(pose);
      }
      return flow;
    }
  }

  getFollowUpPose(sourcePose: Pose, flow: Pose[], transitions: Transition[], poses: Pose[]) {
    const transition = this.selectTransition(sourcePose, transitions, flow);
    return poses.find(pose => pose.id === transition.targetPoseId);
  }

  selectTransition(sourcePose: Pose, transitions: Transition[], flow: Pose[]) {
    let validTransitions = transitions.filter(t => t.sourcePoseId === sourcePose.id);
    validTransitions = validTransitions.length > 0 ? validTransitions : transitions;

    const newTransitions = validTransitions.filter(t => !flow.find(pose => pose.id === t.targetPoseId));
    if (newTransitions.length > 0) {
      return Randomizer.getRandomArrayValue(newTransitions);
    } else {
      return Randomizer.getRandomArrayValue(validTransitions);
    }
  }

  setupWhereConditions(settings: IFlowGeneratorSettings): WhereOptions<Pose> {
    const where: WhereOptions<Pose> = {
      persons: 2,
      status: Status.Accepted,
    };
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
}
