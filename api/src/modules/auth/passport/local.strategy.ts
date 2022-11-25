import {LoginStrategy} from '@acrommunity/common';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {Crypt, Validator} from '~/utils';
import {AuthService} from '../auth.service';
import {loginSchema} from '../validation/login.joi';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  public async validate(req, email: string, password: string) {
    Validator.validate(loginSchema, req.body);

    const user = await this.authService.getUserByEmail(email, LoginStrategy.Local);
    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isPasswordValid = await Crypt.validatePassword(password, user.getDataValue('password'));
    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid credentials');
    }

    user.setDataValue('password', undefined);

    return user.toJSON();
  }
}
