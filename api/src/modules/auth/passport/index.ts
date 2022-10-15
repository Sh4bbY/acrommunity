import {JwtStrategy} from './jwt.strategy';
import {LoginStrategy} from './login.strategy';
import {RefreshStrategy} from './refresh.strategy';

export const strategies = [
  LoginStrategy,
  RefreshStrategy,
  JwtStrategy,
];
