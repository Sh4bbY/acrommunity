import {Controller, Get, Param, Query} from '@nestjs/common';
import Joi from 'joi';
import {Validator} from '~/utils';
import {VideoService} from './video.service';

@Controller('/api/videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.videoService.getPaginatedData(queryParams);
  }

  @Get(':id')
  async getOne(@Param() params: any) {
    Validator.validate(Joi.object({
      id: Joi.number(),
    }), params);

    return await this.videoService.getVideo(Number(params.id));
  }
}
