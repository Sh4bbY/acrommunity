import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Alias, Attachment, Flow, Image, Pose, Skill, Tag, Transition, Video} from '~/models';
import {PT_Attachable, PT_Taggable} from '~/models/pivot';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';

@Module({
  imports: [SequelizeModule.forFeature([Pose, Transition, Skill, Flow, Attachment, Alias, Tag, PT_Attachable, PT_Taggable, Image, Video])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {
}
