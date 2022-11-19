import {Controller, Get, Param, Query} from '@nestjs/common';
import {Validator} from '~/utils';
import {JamService} from './jam.service';

@Controller('/api/jams')
export class JamControllerPublic {
  constructor(private readonly jamService: JamService) {
  }

  @Get()
  async getPaginatedData(@Query() _query: any) {
    return await this.jamService.getPaginatedData();
  }

  @Get('search')
  async searchJams(@Query() query: any) {
    return await this.jamService.searchJams(query);
  }

  @Get(':id')
  async getJamDetails(@Param('id') id: string) {
    Validator.validateId(id);
    return await this.jamService.getJam(Number(id));
  }
}
