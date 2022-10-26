import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import Joi from 'joi';
import {Validator} from '~/utils';
import {PoseService} from './pose.service';

@Controller('/api/poses')
@UseGuards(AuthGuard('jwt'))
export class PoseController {
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

  @Put(':id')
  async updatePose(@Param() params: any, @Body() body: any) {
    Validator.validate(Joi.number().label('id'), params.id);
    // Validator.validate(Joi.object({}), body);

    return await this.poseService.updatePose(Number(params.id), body);
  }

  @Post()
  async createPose(@Body() body: any) {
    // Validator.validate(Joi.object({
    //   name: Joi.string(),
    // }), body);

    return await this.poseService.createPose(body);
  }
}
