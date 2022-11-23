import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {AcrouletteController} from './acroulette.controller';
import {AcrouletteService} from './acroulette.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
  ],
  controllers: [AcrouletteController],
  providers: [AcrouletteService],
  exports: [AcrouletteService],
})
export class AcrouletteModule {
}
