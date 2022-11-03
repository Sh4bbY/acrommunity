import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Image} from '~/models';
import {ImageController} from './image.controller';
import {ImageService} from './image.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Image]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {
}
