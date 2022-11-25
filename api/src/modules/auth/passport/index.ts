import {FacebookStrategy} from '~/modules/auth/passport/facebook.strategy';
import {GoogleStrategy} from './google.strategy';
import {JwtStrategy} from './jwt.strategy';
import {LocalStrategy} from './local.strategy';
import {RefreshStrategy} from './refresh.strategy';

export const strategies = [
  LocalStrategy,
  RefreshStrategy,
  JwtStrategy,
  GoogleStrategy,
  FacebookStrategy,
];
