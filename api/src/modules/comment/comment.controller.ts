import {Body, Controller, Get, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Validator} from '~/utils';
import {CommentService} from './comment.service';
import {CommentDto} from './dto';

@Controller('/api/comments')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.commentService.getPaginatedData(queryParams);
  }

  @Post()
  async create(@Body() data: CommentDto, @Req() req) {
    const text = data.text.replace(/\n/g, '<br>');
    return await this.commentService.create({...data, text, authorId: req.user.id});
  }

  @Get(':commentableType/:commentableId')
  async findComments(@Param('commentableType') commentableType: string, @Param('commentableId') commentableId: string) {
    // TODO: provide pagination for comments
    const id = Validator.validateId(commentableId);
    return await this.commentService.getCommentsFor(commentableType, id);
  }
}
