import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Pose, Transition} from '~/models';
import {EmailModule} from '~/modules/email/email.module';
import {EmailService} from '~/modules/email/email.service';
import {AcroletteController} from './acrolette.controller';
import {AcroletteService} from './acrolette.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pose, Transition]),
    EmailModule,
  ],
  controllers: [AcroletteController],
  providers: [AcroletteService, EmailService],
  exports: [AcroletteService],
})
export class AcroletteModule {
}
