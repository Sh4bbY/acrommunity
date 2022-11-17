import {BasePosition, FlyerPosition, Role} from '@acrommunity/common';
import {Body, Controller, Delete, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import Joi from 'joi';
import {Validator} from '~/utils';
import {Roles} from '~/utils/nest/roles.decorator';
import {RolesGuard} from '~/utils/nest/roles.guard';
import {PoseService} from './pose.service';

@Controller('/api/poses')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
@UseGuards(AuthGuard('jwt'))
export class PoseControllerAdmin {
  constructor(private readonly poseService: PoseService) {
  }

  @Post()
  async createPose(@Body() body: any) {
    // TODO: validation
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
      easyIn: Joi.boolean().optional(),
      easyOut: Joi.boolean().optional(),
      counterbalance: Joi.boolean().optional(),
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
