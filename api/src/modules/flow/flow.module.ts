import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Flow} from '~/models';
import {FlowController} from './flow.controller';
import {FlowService} from './flow.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Flow]),
  ],
  controllers: [FlowController],
  providers: [FlowService],
  exports: [FlowService],
})
export class FlowModule {
}
