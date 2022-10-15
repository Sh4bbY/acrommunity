import {Controller, Get, Query} from '@nestjs/common';
import {GeolocationService} from './geolocation.service';

@Controller('/api/geolocation')
export class GeolocationController {
  constructor(private readonly locationService: GeolocationService) {
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.locationService.search(query);
  }

  @Get('reverse')
  reverse(@Query() query: any) {
    return this.locationService.reverse(query.lat, query.lng);
  }
}
