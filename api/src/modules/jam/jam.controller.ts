import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {Validator} from '~/utils';
import {JamService} from './jam.service';

@Controller('/api/jams')
export class JamController {
  constructor(private readonly jamService: JamService) {
  }

  @Get()
  async getPaginatedData(@Query() query: any) {
    return await this.jamService.getPaginatedData(query);
  }

  @Get(':id')
  async getJamDetails(@Param('id') id: string) {
    Validator.validateId(id);
    return await this.jamService.getJam(Number(id));
  }

  @Post()
  async createJam(@Body() body: any) {
    return await this.jamService.createJam(body);
  }
}
