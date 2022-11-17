import {Controller, Get, Query} from '@nestjs/common';
import {AcroletteService} from './acrolette.service';

@Controller('/api/acrolette')
export class AcroletteController {
  constructor(private readonly acroletteService: AcroletteService) {
  }

  @Get('pose')
  async getOne(@Query() query: any) {
    return await this.acroletteService.getRandomPose(query);
  }

  @Get('pose-options')
  async getPoseOptions() {
    return await this.acroletteService.getPoseOptions();
  }
}
