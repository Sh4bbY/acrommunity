import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Flow, Jam, List, Pose, Skill, User, Image, Video} from '~/models';
import {PT_Listable, PT_Markable} from '~/models/pivot';
import {MyController} from './my.controller';
import {MyService} from './my.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, List, PT_Listable, PT_Markable, Pose, Flow, Skill, Jam, Image, Video]),
  ],
  controllers: [MyController],
  providers: [MyService],
  exports: [MyService],
})
export class MyModule {
}
