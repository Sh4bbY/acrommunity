import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AcroletteService} from './acrolette.service';


@Controller('/api/acrolette')
@UseGuards(AuthGuard('jwt'))
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
