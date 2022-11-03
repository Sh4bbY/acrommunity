import {Controller, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {HomeService} from './home.service';

@Controller('/api/home')
@UseGuards(AuthGuard('jwt'))
export class HomeController {
  constructor(private readonly homeService: HomeService) {
  }

  @Get('/poses')
  async getHomePoses() {
    return await this.homeService.getRandomPoses();
  }

  @Get('/flows')
  async getHomeFlows() {
    return await this.homeService.getRandomFlows();
  }

  @Get('/images')
  async getHomeImages() {
    return await this.homeService.getRandomImages();
  }

  @Get('/videos')
  async getHomeVideos() {
    return await this.homeService.getRandomVideos();
  }
}
