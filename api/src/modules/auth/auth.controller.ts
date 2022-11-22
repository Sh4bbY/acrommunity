import {LoginStrategy} from '@acrommunity/common';
import {BadRequestException, Controller, Get, HttpCode, Post, Req, Res, UseFilters, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request, Response} from 'express';
import {config} from '~/config';
import {registerSchema} from '~/modules/auth/validation/register.joi';
import {EmailService} from '~/modules/email/email.service';
import {Validator} from '~/utils';
import {FacebookExceptionFilter} from '~/utils/nest/facebook-exception-filter';
import {PassportExceptionFilter} from '~/utils/nest/passport-exception-filter';
import {RefreshExceptionFilter} from '~/utils/nest/refresh-exception-filter';
import {AuthService} from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private emailService: EmailService) {
  }

  @Post('register')
  async register(@Req() req: Request) {
    Validator.validate(registerSchema, req.body);

    try {
      const user = await this.authService.createUser(req.body);

      const email = this.emailService.loadTemplate('sign-up', {username: user.username, url: config.appUrl});
      await this.emailService.send({to: user.email, html: email.html, subject: email.subject});

      return user;
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        if (e.fields.email) {
          throw new BadRequestException(`Email "${e.fields.email}" is already registered`);
        }
        if (e.fields.username) {
          throw new BadRequestException(`Username "${e.fields.username}" is already taken`);
        }
      }
      throw e;
    }
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request, @Res() res: Response) {
    res.cookie('refreshToken', AuthService.createRefreshToken(req.user), {path: '/api/auth/refresh', httpOnly: true});

    delete req.user.password;

    return res.send({
      user: req.user,
      token: AuthService.createAccessToken(req.user),
    });
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req, @Res() res) {
    res.cookie('refreshToken', '', {maxAge: 0, path: '/api/auth/refresh', httpOnly: true});
    res.send();
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard('refresh'))
  @UseFilters(RefreshExceptionFilter)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    res.cookie('refreshToken', AuthService.createRefreshToken(req.user), {path: '/api/auth/refresh', httpOnly: true});

    delete req.user.password;

    res.send({
      user: req.user,
      token: AuthService.createAccessToken(req.user),
    });
  }


  @Get('google')
  @UseGuards(AuthGuard('google'))
  @UseFilters(PassportExceptionFilter)
  async googleAuth() {
    // forward request to google oauth
  }

  @Get('google/callback')
  @HttpCode(200)
  @UseGuards(AuthGuard('google'))
  @UseFilters(PassportExceptionFilter)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.communityLogin(req.user, LoginStrategy.Google);
    res.cookie('refreshToken', AuthService.createRefreshToken(user), {path: '/api/auth/refresh', httpOnly: true});

    res.send({
      user: user,
      token: AuthService.createAccessToken(user),
    });
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    // forward request to facebook oauth
  }

  @Get('facebook/callback')
  @HttpCode(200)
  @UseGuards(AuthGuard('facebook'))
  @UseFilters(FacebookExceptionFilter)
  async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.communityLogin(req.user, LoginStrategy.Facebook);
    res.cookie('refreshToken', AuthService.createRefreshToken(user), {path: '/api/auth/refresh', httpOnly: true});

    res.send({
      user: user,
      token: AuthService.createAccessToken(user),
    });
  }
}
