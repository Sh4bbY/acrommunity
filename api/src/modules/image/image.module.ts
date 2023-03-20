import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Image} from '~/models';
import {ImageControllerUser} from '~/modules/image/image.controller.user';
import {MyModule} from '~/modules/my/my.module';
import {ImageController} from './image.controller';
import {ImageService} from './image.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Image]),
    MyModule,
  ],
  controllers: [ImageController, ImageControllerUser],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {
}
