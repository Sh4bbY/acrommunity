import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AcroletteService} from './acrolette.service';


@Controller('/api/acrolette')
@UseGuards(AuthGuard('jwt'))
export class AcroletteController {
  constructor(private readonly acroletteService: AcroletteService) {
  }

  @Get('pose')
  async getOne(@Query('current') currentPoseId?: string) {
    return await this.acroletteService.getRandomPose(currentPoseId);
  }
}
