import {Controller, Get, Param, Query} from '@nestjs/common';
import Joi from 'joi';
import {Validator} from '~/utils';
import {PoseService} from './pose.service';

@Controller('/api/poses')
export class PoseControllerPublic {
  constructor(private readonly poseService: PoseService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.poseService.getPaginatedData(queryParams);
  }

  @Get('options')
  async getPoseOptions() {
    return await this.poseService.getOptions();
  }

  @Get('search')
  async findPoses(@Query('search') search: string) {
    return await this.poseService.findPoses(search);
  }

  @Get(':id/transitions')
  async getTransitions(@Param() params: any) {
    Validator.validate(Joi.object({id: Joi.number()}), params);

    return await this.poseService.getTransitionTargets(Number(params.id));
  }

  @Get(':id')
  async getOne(@Param() params: any) {
    Validator.validate(Joi.object({
      id: Joi.number(),
    }), params);

    return await this.poseService.getPose(Number(params.id));
  }
}
