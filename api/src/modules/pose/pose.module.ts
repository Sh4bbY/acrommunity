import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {PoseController} from './pose.controller';
import {PoseService} from './pose.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
  ],
  controllers: [PoseController],
  providers: [PoseService],
  exports: [PoseService],
})
export class PoseModule {
}
