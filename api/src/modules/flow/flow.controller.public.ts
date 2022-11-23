import {Controller, Get, Param, Query} from '@nestjs/common';
import {Validator} from '~/utils';
import {FlowService} from './flow.service';

@Controller('/api/flows')
export class FlowControllerPublic {
  constructor(private readonly flowService: FlowService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.flowService.getPaginatedData(queryParams);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    Validator.validateId(id);
    return await this.flowService.getFlow(Number(id));
  }
}
