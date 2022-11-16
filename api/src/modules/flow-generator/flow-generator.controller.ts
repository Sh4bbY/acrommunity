import {IFlowGeneratorSettings} from '@acrommunity/common';
import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {FlowGeneratorService} from './flow-generator.service';


@Controller('/api/flow-generator')
@UseGuards(AuthGuard('jwt'))
export class FlowGeneratorController {
  constructor(private readonly flowGeneratorService: FlowGeneratorService) {
  }

  @Post('generate')
  async generate(@Body() body: IFlowGeneratorSettings) {
    return await this.flowGeneratorService.generate(body);
  }

  @Get('pose-options')
  async getPoseOptions() {
    return await this.flowGeneratorService.getPoseOptions();
  }
}
