import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
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
      startDate: new Date(body.date),
      endDate: new Date(body.date),
    };
    return await this.jamService.createJam(jam);
  }
}
