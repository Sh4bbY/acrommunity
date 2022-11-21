import {JwtStrategy} from './jwt.strategy';
import {LocalStrategy} from './local-strategy.service';
import {RefreshStrategy} from './refresh.strategy';
import {GoogleStrategy} from './google.strategy';

export const strategies = [
  LocalStrategy,
  RefreshStrategy,
  JwtStrategy,
  GoogleStrategy,
];
