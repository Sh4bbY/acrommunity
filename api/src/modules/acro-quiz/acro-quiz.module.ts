import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {AcroQuizController} from './acro-quiz.controller';
import {AcroQuizService} from './acro-quiz.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
  ],
  controllers: [AcroQuizController],
  providers: [AcroQuizService],
  exports: [AcroQuizService],
})
export class AcroQuizModule {
}
