import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Flow, Pose, Skill, Transition} from '~/models';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';

@Module({
  imports: [SequelizeModule.forFeature([Pose, Transition, Skill, Flow])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {
}
