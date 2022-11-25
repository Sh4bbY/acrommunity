import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {config} from '~/config';
import {AuthService} from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies.refreshToken]),
      secretOrKey: config.jwt.refresh.secret,
      issuer: config.jwt.issuer,
      passReqToCallback: true,
    });
  }

  public async validate(req, payload) {
    if (!req.cookies.refreshToken) {
      throw new UnauthorizedException('no token');
    }

    const user = await this.authService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    user.setDataValue('password', undefined);

    return user.toJSON();
  }
}
