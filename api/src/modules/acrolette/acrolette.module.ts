import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {AcroletteController} from './acrolette.controller';
import {AcroletteService} from './acrolette.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
  ],
  controllers: [AcroletteController],
  providers: [AcroletteService],
  exports: [AcroletteService],
})
export class AcroletteModule {
}
