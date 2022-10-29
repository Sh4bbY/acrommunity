import {Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {ProxyService} from './proxy.service';

@Controller('/api/proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {
  }

  @Get('instagram/media/:mediaId')
  async proxyInstagram(@Res() res: Response, @Req() request: Request, @Param('mediaId') mediaId: string, @Query('size') size = 't') {
    const response = await this.proxyService.requestInstagramMedia(mediaId, size);
    res.contentType(response.headers['content-type']);
    res.end(response.data);
  }
}
