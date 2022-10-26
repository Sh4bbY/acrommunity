import {userValidation} from '@acrommunity/common';
import {Body, Controller, Inject, Put, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {EmailService} from '~/modules/email/email.service';
import {UpdateEmailDto, UpdatePasswordDto, UpdateProfileDto} from '~/modules/profile/dto';
import {Validator} from '~/utils';
import {ProfileService} from './profile.service';

@Controller('/api/profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private readonly userService: ProfileService,
              @Inject(EmailService) private emailService: EmailService) {
  }

  @Put()
  async updateProfile(@Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    Validator.validate(userValidation.schema.update, updateProfileDto);
    return await this.userService.updateProfile(req.user.id, updateProfileDto);
  }

  @Put('email')
  async updateEmail(@Req() req: Request, @Body() updateEmailDto: UpdateEmailDto) {
    Validator.validate(userValidation.schema.email, updateEmailDto);
    return await this.userService.updateEmail(req.user.id, updateEmailDto.email);
  }

  @Put('password')
  async updatePassword(@Req() req: Request, @Body() updatePasswordDto: UpdatePasswordDto) {
    Validator.validate(userValidation.schema.password, updatePasswordDto);
    return await this.userService.updatePassword(req.user.id, updatePasswordDto.password);
  }
}
