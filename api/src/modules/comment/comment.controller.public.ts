import {Controller, Get, Param} from '@nestjs/common';
import {Validator} from '~/utils';
import {CommentService} from './comment.service';

@Controller('/api/comments')
export class CommentControllerPublic {
  constructor(private readonly commentService: CommentService) {
  }

  @Get(':commentableType/:commentableId')
  async findComments(@Param('commentableType') commentableType: string, @Param('commentableId') commentableId: string) {
    // TODO: provide pagination for comments
    const id = Validator.validateId(commentableId);
    return await this.commentService.getCommentsFor(commentableType, id);
  }
}
