import {BasePosition} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Alias, Attachment, Pose, Tag, Transition} from '~/models';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition) {
  }

  async exportLbasePoses(): Promise<any> {
    const poseRecords = await this.poseModel.findAll({
      where: {
        basePosition: BasePosition.LYING_ON_BACK,
      },
      include: [Attachment, Alias, Tag, {model: Pose, as: 'sourcePoses'}, {model: Pose, as: 'targetPoses'}],
    });
    const poses = poseRecords.map(record => record.get({plain: true}));

    return poses.map(this.transformPose);
  }

  transformPose(pose: Pose) {
    return {
      ...pose,
      tags: pose.tags.map(t => t.name),
      aliases: pose.aliases.map(a => a.name),
      attachments: pose.attachments.map(a => a.url),
      targetPoses: pose.sourcePoses.map(sp => sp.name),
      sourcePoses: pose.targetPoses.map(tp => tp.name),
    };
  }
}
