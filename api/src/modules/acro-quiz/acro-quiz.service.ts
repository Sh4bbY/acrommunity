import {QuestionType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {literal, Op} from 'sequelize';
import {Pose, Transition} from '~/models';
import {Alias} from '~/models/Alias';
import {Attachment} from '~/models/Attachment';
import {AnswerDTO} from '~/modules/acro-quiz/acro-quiz.controller';
import {Randomizer} from '~/utils';

@Injectable()
export class AcroQuizService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition) {
  }

  async getNameOfPoseQuestion() {
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
      pose: {id: pose.id},
      type: QuestionType.NameOfPose,
      img: pose.attachments[0].url,
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
      type: QuestionType.LookOfPose,
      pose: {id: pose.id, name: pose.name},
      answers,
    };
  }

  async checkAnswer(body: AnswerDTO) {
    const answer = body.answer;
    let record;
    switch (body.type) {
      case QuestionType.NameOfPose:
        record = await this.poseModel.findOne({where: {id: answer.id}});
        return {
          isCorrect: record.name === answer.selection,
          solution: record.name,
        };

      case QuestionType.LookOfPose:
        record = await this.poseModel.findOne({where: {id: answer.id}, include: [Attachment]});
        const pose = record.get({plain: true});
        return {
          isCorrect: !!pose.attachments.find(attachment => attachment.url === answer.selection),
          solution: pose.attachments[0].url,
        };
    }
  }
}
