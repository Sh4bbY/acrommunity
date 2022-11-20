import {Inject, Injectable, Logger} from '@nestjs/common';
import fs from 'fs';
import {Options} from 'nodemailer/lib/mailer';
import path from 'path';
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

  loadTemplate(name: string, data: any) {
    try {
      let html = fs.readFileSync(path.join(process.cwd(), 'email/templates', `${name}.html`), 'utf-8');
      const style = fs.readFileSync(path.join(process.cwd(), 'email/styles', `style.css`), 'utf-8');
      html = html.replace('{{ style }}', `<style type="text/css">${style}</style>`);
      html = html.replace(new RegExp(`\{\{ APP_URL \}\}`, 'g'), config.appUrl);

      Object.keys(data).forEach(key => {
        html = html.replace(new RegExp(`\{${key}\}`, 'g'), data[key]);
      });

      const subject = new RegExp(/<title>(.+)<\/title>/).exec(html)[1];
      return {html, subject};
    } catch (e) {
      Logger.error('Email Template not found', e.message);
      return null;
    }
  }
}
