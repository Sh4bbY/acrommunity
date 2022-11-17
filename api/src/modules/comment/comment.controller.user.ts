import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {CommentService} from './comment.service';
import {CommentDto} from './dto';

@Controller('/api/comments')
@UseGuards(AuthGuard('jwt'))
export class CommentControllerUser {
  constructor(private readonly commentService: CommentService) {
  }

  @Post()
  async create(@Body() data: CommentDto, @Req() req) {
    const text = data.text.replace(/\n/g, '<br>');
    return await this.commentService.create({...data, text, authorId: req.user.id});
  }
}
