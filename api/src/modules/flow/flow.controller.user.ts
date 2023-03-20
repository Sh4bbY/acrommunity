import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {Validator} from '~/utils';
import {FlowService} from './flow.service';

@Controller('/api/authenticated/flows')
@UseGuards(AuthGuard('jwt'))
export class FlowControllerUser {
  constructor(private readonly flowService: FlowService) {
  }

  @Get()
  async getPaginatedData(@Query() query, @Req() req: Request) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.flowService.getPaginatedData(queryParams, req.user);
  }
}
