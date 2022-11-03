import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {literal} from 'sequelize';
import {Attachment, Flow, Image, Pose, Skill, Video} from '~/models';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Flow) private flowModel: typeof Flow,
    @InjectModel(Skill) private skillModel: typeof Skill,
    @InjectModel(Image) private imageModel: typeof Image,
    @InjectModel(Video) private videoModel: typeof Video,
  ) {
  }

  async getRandomPoses() {
    return await this.poseModel.findAll({
      include: [{
        model: Attachment,
        required: true,
      }],
      limit: 10,
      order: [literal('rand()')],
    });
  }

  async getRandomFlows() {
    return await this.flowModel.findAll({
      include: [{
        model: Attachment,
        required: true,
      }],
      limit: 10,
      order: [literal('rand()')],
    });
  }

  async getRandomImages() {
    return await this.imageModel.findAll({
      limit: 10,
      order: [literal('rand()')],
    });
  }

  async getRandomVideos() {
    return await this.videoModel.findAll({
      limit: 10,
      order: [literal('rand()')],
    });
  }
}
