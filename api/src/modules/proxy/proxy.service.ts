import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {
  }

  async requestInstagramMedia(mediaId: string, size: string): Promise<any> {
    return await this.httpService.axiosRef.get(`https://www.instagram.com/p/${mediaId}/media?size=${size}`, {responseType: 'arraybuffer'});
  }
}
