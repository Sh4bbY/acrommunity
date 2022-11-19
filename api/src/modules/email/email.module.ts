import {Module} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {config} from '~/config';
import {EmailController} from '~/modules/email/email.controller';
import {EmailService} from './email.service';

@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    {provide: 'NodeMailer', useFactory: () => nodemailer.createTransport(smtpOptions)},
  ],
  exports: [
    EmailService,
    {provide: 'NodeMailer', useFactory: () => nodemailer.createTransport(smtpOptions)},
  ],
})
export class EmailModule {
}

const smtpOptions = {
  host: config.email.host,
  port: Number(config.email.port),
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
};
