import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {JamService} from './jam.service';

@Controller('/api/jams')
export class JamController {
  constructor(private readonly jamService: JamService) {
  }

  @Get()
  async getPaginatedData(@Query() query: any) {
    return await this.jamService.getPaginatedData(query);
  }

  @Post()
  async createJam(@Body() body: any) {
    return await this.jamService.createJam(body);
  }
}
