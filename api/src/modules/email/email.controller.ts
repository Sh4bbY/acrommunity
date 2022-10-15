import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Options} from 'nodemailer/lib/mailer';
import {EmailService} from './email.service';

@Controller('/api/emails')
@UseGuards(AuthGuard('jwt'))
export class EmailController {
  constructor(private readonly emailService: EmailService) {
  }

  @Post('send')
  async send(@Body() emailOptions: Options) {
    return await this.emailService.send(emailOptions);
  }
}
