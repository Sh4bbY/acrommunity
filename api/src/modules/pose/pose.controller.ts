import {BasePosition, FlyerPosition} from '@acrommunity/common';
import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards} from '@nestjs/common';
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

  // Update routes
  @Patch(':id')
  async updateData(@Param('id') id: string, @Body() body: { difficulty?: number, persons?: number, basePosition?: BasePosition, flyerPosition?: FlyerPosition, }) {
    Validator.validate(Joi.object({
      difficulty: Joi.number().optional(),
      persons: Joi.number().optional(),
      basePosition: Joi.string().optional(),
      flyerPosition: Joi.string().optional(),
      status: Joi.string().optional(),
      name: Joi.string().optional(),
    }), body);

    return await this.poseService.updatePoseData(+id, body);
  }

  @Delete(':id/remove-tag/:tagId')
  async removeTag(@Param('id') id: string, @Param('tagId') tagId: string) {
    return await this.poseService.removeTag(+id, +tagId);
  }

  @Delete(':id/remove-alias/:aliasId')
  async removeAlias(@Param('id') id: string, @Param('aliasId') aliasId: string) {
    return await this.poseService.removeAlias(+aliasId);
  }

  @Delete(':sourceId/remove-transition/:targetId')
  async removeTransition(@Param('sourceId') sourceId: string, @Param('targetId') targetId: string) {
    return await this.poseService.removeTransition(+sourceId, +targetId);
  }

  @Post(':id/tag/:tag')
  async addTag(@Param('id') id: string, @Param('tag') tag: string) {
    return await this.poseService.addTag(+id, tag);
  }

  @Post(':id/alias/:alias')
  async addAlias(@Param('id') id: string, @Param('alias') alias: string) {
    return await this.poseService.addAlias(+id, alias);
  }

  @Post(':id/attachment')
  async addAttachment(@Param('id') id: string, @Body('url') url: string) {
    return await this.poseService.addAttachment(+id, url);
  }

  @Delete(':id/attachment/:attachmentId')
  async removeAttachment(@Param('id') id: string, @Param('attachmentId') attachmentId: string) {
    return await this.poseService.removeAttachment(+id, +attachmentId);
  }

  @Post(':id/transition-from/:sourceId')
  async addTransitionFrom(@Param('id') id: string, @Param('sourceId') sourceId: string) {
    return await this.poseService.addTransition(+sourceId, +id);
  }

  @Post(':id/transition-to/:targetId')
  async addTransitionTo(@Param('id') id: string, @Param('targetId') targetId: string) {
    return await this.poseService.addTransition(+id, +targetId);
  }

  @Delete(':id')
  async deletePose(@Param('id') id: string) {
    return await this.poseService.deletePose(+id);
  }
}
