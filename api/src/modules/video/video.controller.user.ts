import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {Validator} from '~/utils';
import {VideoService} from './video.service';

@Controller('/api/authenticated/videos')
@UseGuards(AuthGuard('jwt'))
export class VideoControllerUser {
  constructor(private readonly videoService: VideoService) {
  }

  @Get()
  async getPaginatedData(@Query() query, @Req() req: Request) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.videoService.getPaginatedData(queryParams, req.user);
  }
}
