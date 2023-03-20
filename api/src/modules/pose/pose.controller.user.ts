import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {Validator} from '~/utils';
import {PoseService} from './pose.service';

@Controller('/api/authenticated/poses')
@UseGuards(AuthGuard('jwt'))
export class PoseControllerUser {
  constructor(private readonly poseService: PoseService) {
  }

  @Get()
  async getPaginatedData(@Query() query, @Req() req: Request) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.poseService.getPaginatedData(queryParams, req.user);
  }
}
