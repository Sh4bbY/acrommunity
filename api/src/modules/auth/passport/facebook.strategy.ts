import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-facebook';
import {config} from '~/config';
import {AuthService} from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: config.auth.facebook.clientId,
      clientSecret: config.auth.facebook.secret,
      callbackURL: config.appUrl + '/auth/facebook/callback',
      scope: 'email',
      profileFields: ['email', 'displayName', 'name', 'photos'],
    });
  }

  public async validate(accessToken: string, refreshToken: string, profile: any) {
    const user: any = {
      email: profile.emails[0].value,
      username: profile.displayName || profile.username || `${profile.name.givenName} ${profile.name.familyName}`,
      avatar: profile.photos[0].value,
    };

    return user;
  }
}
