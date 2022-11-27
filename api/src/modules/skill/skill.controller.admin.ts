import {PoseStatus, Role, SkillType} from '@acrommunity/common';
import {Body, Controller, Delete, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import Joi from 'joi';
import {Validator} from '~/utils';
import {Roles} from '~/utils/nest/roles.decorator';
import {RolesGuard} from '~/utils/nest/roles.guard';
import {SkillService} from './skill.service';

@Controller('/api/skills')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
@UseGuards(AuthGuard('jwt'))
export class SkillControllerAdmin {
  constructor(private readonly skillService: SkillService) {
  }

  @Post()
  async create(@Body() body: any) {
    Validator.validate(Joi.object({
      name: Joi.string().required(),
      difficulty: Joi.number().positive().max(6).required(),
      description: Joi.string().optional(),
      type: Joi.string().valid(...Object.values(SkillType)).optional(),
      status: Joi.string().optional(),
      persons: Joi.number().positive().required(),
      aliases: Joi.array().items(Joi.string()).required(),
      tags: Joi.array().items(Joi.string()).required(),
      attachments: Joi.array().items(Joi.object({url: Joi.string(), type: Joi.string()})).required(),
    }), body);
    return await this.skillService.create(body);
  }

  // Update routes
  @Patch(':id')
  async updateData(@Param('id') id: string, @Body() body: any) {
    Validator.validate(Joi.object({
      difficulty: Joi.number().optional(),
      persons: Joi.number().optional(),
      type: Joi.string().valid(...Object.values(SkillType)).optional(),
      status: Joi.string().valid(...Object.values(PoseStatus)).optional(),
      name: Joi.string().optional(),
    }), body);

    return await this.skillService.updateSkillData(+id, body);
  }

  @Post(':id/tag/:tag')
  async addTag(@Param('id') id: string, @Param('tag') tag: string) {
    return await this.skillService.addTag(+id, tag);
  }

  @Delete(':id/remove-tag/:tagId')
  async removeTag(@Param('id') id: string, @Param('tagId') tagId: string) {
    return await this.skillService.removeTag(+id, +tagId);
  }

  @Post(':id/alias/:alias')
  async addAlias(@Param('id') id: string, @Param('alias') alias: string) {
    return await this.skillService.addAlias(+id, alias);
  }

  @Delete(':id/remove-alias/:aliasId')
  async removeAlias(@Param('id') id: string, @Param('aliasId') aliasId: string) {
    return await this.skillService.removeAlias(+aliasId);
  }

  @Post(':id/attachment')
  async addAttachment(@Param('id') id: string, @Body('url') url: string) {
    return await this.skillService.addAttachment(+id, url);
  }

  @Delete(':id/attachment/:attachmentId')
  async removeAttachment(@Param('id') id: string, @Param('attachmentId') attachmentId: string) {
    return await this.skillService.removeAttachment(+id, +attachmentId);
  }

  @Delete(':id')
  async deleteSkill(@Param('id') id: string) {
    return await this.skillService.deleteSkill(+id);
  }
}
