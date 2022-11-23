import {BasePosition, FlowStatus, FlyerPosition, Role} from '@acrommunity/common';
import {Body, Controller, Delete, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import Joi from 'joi';
import {Validator} from '~/utils';
import {Roles} from '~/utils/nest/roles.decorator';
import {RolesGuard} from '~/utils/nest/roles.guard';
import {FlowService} from './flow.service';

@Controller('/api/flows')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
@UseGuards(AuthGuard('jwt'))
export class FlowControllerAdmin {
  constructor(private readonly flowService: FlowService) {
  }

  @Post()
  async createFlow(@Body() body: any) {
    Validator.validate(Joi.object({
      name: Joi.string(),
      difficulty: Joi.number().positive(),
      description: Joi.string(),
      aliases: Joi.array().items(Joi.string()),
      tags: Joi.array().items(Joi.string()),
      attachments: Joi.array().items(Joi.object({
        url: Joi.string(),
        type: Joi.string(),
      })),
    }), body);

    return await this.flowService.createFlow(body);
  }

  // Update routes
  @Patch(':id')
  async updateData(@Param('id') id: string, @Body() body: { difficulty?: number, persons?: number, basePosition?: BasePosition, flyerPosition?: FlyerPosition, }) {
    Validator.validate(Joi.object({
      difficulty: Joi.number().optional(),
      description: Joi.string().optional().allow(''),
      status: Joi.string().valid(...Object.values(FlowStatus)),
      name: Joi.string().optional(),
    }), body);

    return await this.flowService.updateFlowData(+id, body);
  }

  @Delete(':id/remove-tag/:tagId')
  async removeTag(@Param('id') id: string, @Param('tagId') tagId: string) {
    return await this.flowService.removeTag(+id, +tagId);
  }

  @Delete(':id/remove-alias/:aliasId')
  async removeAlias(@Param('id') id: string, @Param('aliasId') aliasId: string) {
    return await this.flowService.removeAlias(+aliasId);
  }

  @Post(':id/tag/:tag')
  async addTag(@Param('id') id: string, @Param('tag') tag: string) {
    return await this.flowService.addTag(+id, tag);
  }

  @Post(':id/alias/:alias')
  async addAlias(@Param('id') id: string, @Param('alias') alias: string) {
    return await this.flowService.addAlias(+id, alias);
  }

  @Post(':id/attachment')
  async addAttachment(@Param('id') id: string, @Body('url') url: string) {
    return await this.flowService.addAttachment(+id, url);
  }

  @Delete(':id/attachment/:attachmentId')
  async removeAttachment(@Param('id') id: string, @Param('attachmentId') attachmentId: string) {
    return await this.flowService.removeAttachment(+id, +attachmentId);
  }

  @Delete(':id')
  async deleteFlow(@Param('id') id: string) {
    return await this.flowService.deleteFlow(+id);
  }
}
