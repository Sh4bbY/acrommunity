import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {FlowGeneratorController} from './flow-generator.controller';
import {FlowGeneratorService} from './flow-generator.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
  ],
  controllers: [FlowGeneratorController],
  providers: [FlowGeneratorService],
  exports: [FlowGeneratorService],
})
export class FlowGeneratorModule {
}
