import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Feedback} from '~/models';
import {FeedbackController} from './feedback.controller';
import {FeedbackService} from './feedback.service';

@Module({
  imports: [SequelizeModule.forFeature([Feedback])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {
}
