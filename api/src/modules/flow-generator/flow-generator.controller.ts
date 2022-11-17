import {IFlowGeneratorSettings} from '@acrommunity/common';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {FlowGeneratorService} from './flow-generator.service';

@Controller('/api/flow-generator')
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
