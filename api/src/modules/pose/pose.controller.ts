import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import Joi from 'joi';
import {Validator} from '~/utils';
import {PoseService} from './pose.service';

// TODO: move to central place
const paginatedDataQuerySchema = Joi.object({
  limit: Joi.number(),
  offset: Joi.number(),
});


@Controller('/api/poses')
@UseGuards(AuthGuard('jwt'))
export class PoseController {
  constructor(private readonly poseService: PoseService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    Validator.validate(paginatedDataQuerySchema, query);
    return await this.poseService.getPaginatedData(query);
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
