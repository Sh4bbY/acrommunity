import {Controller, Get, Query} from '@nestjs/common';
import {AcrouletteService} from './acroulette.service';

@Controller('/api/acroulette')
export class AcrouletteController {
  constructor(private readonly acrouletteService: AcrouletteService) {
  }

  @Get('pose')
  async getOne(@Query() query: any) {
    return await this.acrouletteService.getRandomPose(query);
  }

  @Get('pose-options')
  async getPoseOptions() {
    return await this.acrouletteService.getPoseOptions();
  }
}
