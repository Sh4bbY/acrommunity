import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {AliasModule} from '~/modules/alias/alias.module';
import {AttachmentModule} from '~/modules/attachment/attachment.module';
import {PoseControllerPublic} from '~/modules/pose/pose.controller.public';
import {TagModule} from '~/modules/tag/tag.module';
import {PoseControllerAdmin} from './pose.controller.admin';
import {PoseService} from './pose.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
    AttachmentModule,
    TagModule,
    AliasModule,
  ],
  controllers: [PoseControllerPublic, PoseControllerAdmin],
  providers: [PoseService],
  exports: [PoseService],
})
export class PoseModule {
}
