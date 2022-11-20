import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {lastValueFrom} from 'rxjs';

@Injectable()
export class GeolocationService {
  constructor(private httpService: HttpService) {
  }

  async search(query: string): Promise<any> {
    const response: any = await lastValueFrom(await this.httpService.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'jsonv2',
        addressdetails: 1,
      },
    }));

    return response.data;
  }

  async reverse(lat: number, lng: number): Promise<any> {
    const response: any = await lastValueFrom(await this.httpService.get('https://nominatim.openstreetmap.org/reverse?', {
      params: {
        lat: lat,
        lon: lng,
        format: 'jsonv2',
        addressdetails: 1,
      },
    }));
    return response.data;
  }
}
