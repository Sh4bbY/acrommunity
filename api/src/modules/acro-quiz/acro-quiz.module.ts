import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {EmailModule} from '~/modules/email/email.module';
import {EmailService} from '~/modules/email/email.service';
import {AcroQuizController} from './acro-quiz.controller';
import {AcroQuizService} from './acro-quiz.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
    EmailModule,
  ],
  controllers: [AcroQuizController],
  providers: [AcroQuizService, EmailService],
  exports: [AcroQuizService],
})
export class AcroQuizModule {
}
