import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Skill} from '~/models';
import {AliasModule} from '~/modules/alias/alias.module';
import {AttachmentModule} from '~/modules/attachment/attachment.module';
import {SkillControllerAdmin} from '~/modules/skill/skill.controller.admin';
import {TagModule} from '~/modules/tag/tag.module';
import {SkillControllerPublic} from './skill.controller.public';
import {SkillService} from './skill.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Skill]),
    AttachmentModule,
    TagModule,
    AliasModule,
  ],
  controllers: [SkillControllerPublic, SkillControllerAdmin],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {
}
