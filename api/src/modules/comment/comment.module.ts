import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Comment} from '~/models';
import {CommentControllerPublic} from '~/modules/comment/comment.controller.public';
import {CommentControllerUser} from '~/modules/comment/comment.controller.user';
import {CommentControllerAdmin} from './comment.controller.admin';
import {CommentService} from './comment.service';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentControllerAdmin, CommentControllerUser, CommentControllerPublic],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {
}
