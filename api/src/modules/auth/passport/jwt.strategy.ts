import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {config} from '~/config';
import {AuthService} from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.access.secret,
      issuer: config.jwt.issuer,
      passReqToCallback: true,
    });
  }

  public async validate(req, payload) {
    if (!req.token) {
      throw new UnauthorizedException('no token');
    }

    const user = await this.authService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user.toJSON();
  }
}
