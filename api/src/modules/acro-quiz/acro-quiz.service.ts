import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {literal, Op} from 'sequelize';
import {Pose, Transition} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';
import {Randomizer} from '~/utils';

@Injectable()
export class AcroQuizService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition) {
  }

  async getQuestion() {
    const poses = await this.poseModel.findAll({
      include: [{model: Attachment, required: true}, Alias],
      order: [literal('rand()')],
      limit: 1,
    });
    const pose = poses[0];

    const answerOptions = await this.poseModel.findAll({
      where: {id: {[Op.not]: pose.id}},
      include: [Alias],
      order: [literal('rand()')],
      limit: 3,
    });

    const answers = answerOptions.map(pose => ({text: pose.name})).concat([{text: pose.name}])
      .sort(Randomizer.randomSort);

    return {
      text: 'What is the name of this pose?',
      img: pose.attachments[0].url,
      poseId: pose.id,
      answers,
    };
  }


  async getLookOfPoseQuestion() {
    const poses = await this.poseModel.findAll({
      include: [Attachment, Alias],
      order: [literal('rand()')],
      limit: 1,
    });
    const pose = poses[0];

    const answerOptions = await this.poseModel.findAll({
      where: {id: {[Op.not]: pose.id}},
      include: [{model: Attachment, required: true}],
      order: [literal('rand()')],
      limit: 3,
    });

    const answers = answerOptions.map(pose => ({img: pose.attachments[0].url})).concat([{img: pose.attachments[0].url}])
      .sort(Randomizer.randomSort);

    return {
      text: `How does "${pose.name}" look like?`,
      poseId: pose.id,
      answers,
    };
  }

  async postSolution(body: any) {
    const pose = await this.poseModel.findOne({
      where: {id: body.poseId},
      include: [Alias],
    });

    return {
      isCorrect: pose.name === body.solution,
      solution: pose.name,
    };
  }
}
