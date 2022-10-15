import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from '~/models';
import {EmailModule} from '~/modules/email/email.module';
import {EmailService} from '~/modules/email/email.service';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    EmailModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, EmailService],
  exports: [ProfileService],
})
export class ProfileModule {
}
