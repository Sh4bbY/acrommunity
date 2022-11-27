import {Controller, Get, Param, Query} from '@nestjs/common';
import {Validator} from '~/utils';
import {SkillService} from './skill.service';

@Controller('/api/skills')
export class SkillControllerPublic {
  constructor(private readonly skillService: SkillService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.skillService.getPaginatedData(queryParams);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    Validator.validateId(id);
    return await this.skillService.getSkill(Number(id));
  }
}
