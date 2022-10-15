import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Comment} from '~/models';
import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {
}
