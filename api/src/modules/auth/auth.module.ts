import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from '~/models';
import {EmailModule} from '~/modules/email/email.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {strategies} from './passport';

@Module({
  imports: [SequelizeModule.forFeature([User]), EmailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...strategies,
  ],
})
export class AuthModule {
}
