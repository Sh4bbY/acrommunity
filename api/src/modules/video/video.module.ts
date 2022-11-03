import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Video} from '~/models';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Video]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {
}
