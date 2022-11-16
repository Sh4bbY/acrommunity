import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {FeedbackDto} from '~/modules/feedback/feedback.dto';
import {Validator} from '~/utils';
import {FeedbackService} from './feedback.service';

@Controller('/api/feedback')
@UseGuards(AuthGuard('jwt'))
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.feedbackService.getPaginatedData(queryParams);
  }

  @Post()
  async create(@Body() data: FeedbackDto, @Req() req) {
    const text = data.text.replace(/\n/g, '<br>');
    return await this.feedbackService.create({...data, text, authorId: req.user.id});
  }
}
