import {Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request, Response} from 'express';
import {registerSchema} from '~/modules/auth/validation/register.joi';
import {Validator} from '~/utils';
import {AuthService} from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  async register(@Req() req: Request) {
    Validator.validate(registerSchema, req.body);
    return await this.authService.registerUser(req.body);
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthGuard('login'))
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
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    res.cookie('refreshToken', AuthService.createRefreshToken(req.user), {path: '/api/auth/refresh', httpOnly: true});

    delete req.user.password;

    res.send({
      user: req.user,
      token: AuthService.createAccessToken(req.user),
    });
  }
}
