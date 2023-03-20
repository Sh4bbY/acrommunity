import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {AliasModule} from '~/modules/alias/alias.module';
import {AttachmentModule} from '~/modules/attachment/attachment.module';
import {MyModule} from '~/modules/my/my.module';
import {PoseControllerPublic} from '~/modules/pose/pose.controller.public';
import {PoseControllerUser} from '~/modules/pose/pose.controller.user';
import {TagModule} from '~/modules/tag/tag.module';
import {PoseControllerAdmin} from './pose.controller.admin';
import {PoseService} from './pose.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
    AttachmentModule,
    TagModule,
    AliasModule,
    MyModule,
  ],
  controllers: [PoseControllerPublic, PoseControllerAdmin, PoseControllerUser],
  providers: [PoseService],
  exports: [PoseService],
})
export class PoseModule {
}
