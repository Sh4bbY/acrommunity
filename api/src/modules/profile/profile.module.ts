import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from '~/models';
import {EmailModule} from '~/modules/email/email.module';
import {FileModule} from '~/modules/file/file.module';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    EmailModule,
    FileModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {
}
