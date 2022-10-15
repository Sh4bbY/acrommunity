import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {GeolocationController} from './geolocation.controller';
import {GeolocationService} from './geolocation.service';

@Module({
  imports: [HttpModule],
  controllers: [GeolocationController],
  providers: [GeolocationService],
  exports: [GeolocationService],
})
export class GeolocationModule {
}
