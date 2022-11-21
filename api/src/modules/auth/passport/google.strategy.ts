import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';
import {config} from '~/config';
import {AuthService} from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: config.auth.google.clientId,
      clientSecret: config.auth.google.secret,
      callbackURL: config.auth.google.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  public async validate(accessToken: string, refreshToken: string, profile: any) {
    const user: any = {
      email: profile.emails[0].value,
      username: profile.displayName,
      avatar: profile.photos[0].value,
      accessToken,
    };

    return user;
  }
}
