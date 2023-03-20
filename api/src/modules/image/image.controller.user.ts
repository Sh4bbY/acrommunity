import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {Validator} from '~/utils';
import {ImageService} from './image.service';

@Controller('/api/authenticated/images')
@UseGuards(AuthGuard('jwt'))
export class ImageControllerUser {
  constructor(private readonly imageService: ImageService) {
  }

  @Get()
  async getPaginatedData(@Query() query, @Req() req: Request) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.imageService.getPaginatedData(queryParams, req.user);
  }
}
