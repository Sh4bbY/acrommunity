import {Controller, Get, NotFoundException, Param} from '@nestjs/common';
import {EmailService} from '~/modules/email/email.service';

@Controller('/api/email')
// @UseGuards(AuthGuard('jwt'))
export class EmailController {
  constructor(private readonly emailService: EmailService) {
  }

  @Get('test/:template')
  async getPaginatedData(@Param('template') templateName) {
    const email = this.emailService.loadTemplate(templateName, {username: 'ShabbY'});
    if (!email) {
      throw new NotFoundException();
    }
    return email.html;
  }
}
