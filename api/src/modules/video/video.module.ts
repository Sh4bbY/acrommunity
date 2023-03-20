import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Video} from '~/models';
import {MyModule} from '~/modules/my/my.module';
import {VideoControllerUser} from '~/modules/video/video.controller.user';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Video]),
    MyModule,
  ],
  controllers: [VideoController, VideoControllerUser],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {
}
