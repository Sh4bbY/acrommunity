import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Validator} from '~/utils';
import {FlowService} from './flow.service';

@Controller('/api/flows')
@UseGuards(AuthGuard('jwt'))
export class FlowController {
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
