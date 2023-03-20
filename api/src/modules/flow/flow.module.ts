import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Flow} from '~/models';
import {AliasModule} from '~/modules/alias/alias.module';
import {AttachmentModule} from '~/modules/attachment/attachment.module';
import {FlowControllerAdmin} from '~/modules/flow/flow.controller.admin';
import {FlowControllerUser} from '~/modules/flow/flow.controller.user';
import {MyModule} from '~/modules/my/my.module';
import {TagModule} from '~/modules/tag/tag.module';
import {FlowControllerPublic} from './flow.controller.public';
import {FlowService} from './flow.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Flow]),
    AttachmentModule,
    TagModule,
    AliasModule,
    MyModule,
  ],
  controllers: [FlowControllerPublic, FlowControllerAdmin, FlowControllerUser],
  providers: [FlowService],
  exports: [FlowService],
})
export class FlowModule {
}
