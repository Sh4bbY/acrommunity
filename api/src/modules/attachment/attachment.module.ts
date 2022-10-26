import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Attachment} from '~/models';
import {PT_Attachable} from '~/models/pivot';
import {AttachmentService} from './attachment.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Attachment, PT_Attachable]),
  ],
  controllers: [],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {
}
