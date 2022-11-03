import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Flow, Pose, Skill, Video, Image} from '~/models';
import {AliasModule} from '~/modules/alias/alias.module';
import {AttachmentModule} from '~/modules/attachment/attachment.module';
import {TagModule} from '~/modules/tag/tag.module';
import {HomeController} from './home.controller';
import {HomeService} from './home.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Flow, Skill, Image, Video]),
    AttachmentModule,
    TagModule,
    AliasModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
  exports: [HomeService],
})
export class HomeModule {
}
