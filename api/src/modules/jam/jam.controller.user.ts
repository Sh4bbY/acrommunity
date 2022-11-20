import {JamStatus} from '@acrommunity/common';
import {Body, Controller, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {JamService} from './jam.service';

@Controller('/api/jams')
@UseGuards(AuthGuard('jwt'))
export class JamControllerUser {
  constructor(private readonly jamService: JamService) {
  }

  @Post()
  async createJam(@Req() req: Request, @Body() body: any) {
    const jam = {
      ...body,
      latlng: {type: 'Point', coordinates: body.coordinates},
      creatorId: req.user.id,
      startDate: this.jamService.getDate(body.date, body.startTime),
      endDate: this.jamService.getDate(body.date, body.endTime),
    };
    return await this.jamService.createJam(jam);
  }

  @Put(':id/update')
  async updateJam(@Req() req: Request, @Body() body: any, @Param('id') id: string) {
    const jam = {
      ...body,
      latlng: {type: 'Point', coordinates: body.coordinates},
      creatorId: req.user.id,
      status: JamStatus.OK,
      startDate: this.jamService.getDate(body.date, body.startTime),
      endDate: this.jamService.getDate(body.date, body.endTime),
    };
    return await this.jamService.updateJam(+id, jam);
  }

  @Put(':id/cancel')
  async cancelJam(@Req() req: Request, @Param('id') id: string) {
    return await this.jamService.updateJam(+id, {status: JamStatus.Cancelled});
  }
}
