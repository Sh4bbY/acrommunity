import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Flow} from '~/models';
import {AliasModule} from '~/modules/alias/alias.module';
import {AttachmentModule} from '~/modules/attachment/attachment.module';
import {FlowControllerAdmin} from '~/modules/flow/flow.controller.admin';
import {TagModule} from '~/modules/tag/tag.module';
import {FlowControllerPublic} from './flow.controller.public';
import {FlowService} from './flow.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Flow]),
    AttachmentModule,
    TagModule,
    AliasModule,
  ],
  controllers: [FlowControllerPublic, FlowControllerAdmin],
  providers: [FlowService],
  exports: [FlowService],
})
export class FlowModule {
}
