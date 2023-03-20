import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {Validator} from '~/utils';
import {SkillService} from './skill.service';

@Controller('/api/authenticated/skills')
@UseGuards(AuthGuard('jwt'))
export class SkillControllerUser {
  constructor(private readonly skillService: SkillService) {
  }

  @Get()
  async getPaginatedData(@Query() query, @Req() req: Request) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.skillService.getPaginatedData(queryParams, req.user);
  }
}
