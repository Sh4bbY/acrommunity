import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Skill} from '~/models';
import {SkillController} from './skill.controller';
import {SkillService} from './skill.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Skill]),
  ],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {
}
