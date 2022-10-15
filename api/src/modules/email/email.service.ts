import {Inject, Injectable, Logger} from '@nestjs/common';
import {Options} from 'nodemailer/lib/mailer';
import {config} from '~/config';

@Injectable()
export class EmailService {
  constructor(@Inject('NodeMailer') private readonly nodeMailer) {
  }

  async send(options: Options): Promise<void> {
    try {
      await new Promise((resolve, reject) => {
        options.from = config.email.senderAddress;
        this.nodeMailer.sendMail(options, (error) => error ? reject(error) : resolve(true));
      });
    } catch (e) {
      Logger.error('EmailService.send() failed to send email: ' + e.message);
    }
  }
}
