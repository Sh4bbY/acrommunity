import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Jam} from '~/models';
import {JamControllerUser} from '~/modules/jam/jam.controller.user';
import {JamControllerPublic} from './jam.controller.public';
import {JamService} from './jam.service';

@Module({
  imports: [SequelizeModule.forFeature([Jam])],
  controllers: [JamControllerPublic, JamControllerUser],
  providers: [JamService],
  exports: [JamService],
})
export class JamModule {
}
