import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Jam} from '~/models';
import {JamController} from './jam.controller';
import {JamService} from './jam.service';

@Module({
  imports: [SequelizeModule.forFeature([Jam])],
  controllers: [JamController],
  providers: [JamService],
  exports: [JamService],
})
export class JamModule {
}
