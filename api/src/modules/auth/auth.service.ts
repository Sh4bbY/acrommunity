import {LoginStrategy} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {sign} from 'jsonwebtoken';
import {config} from '~/config';
import {User} from '~/models';
import {Crypt} from '~/utils';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {
  }

  public async createUser(body: any): Promise<any> {
    const password = await Crypt.hashPassword(body.password);
    const record = await this.userModel.create({...body, password, strategy: LoginStrategy.Local});
    return record.get({plain: true});
  }

  // todo: use interface for user
  public static createAccessToken(user: any): string {
    const payload = {
      sub: user.id,
      version: user.tokenVersion,
    };
    const options = {
      expiresIn: config.jwt.access.expiresIn,
      issuer: config.jwt.issuer,
    };

    return sign(payload, config.jwt.access.secret, options);
  }

  // todo: use interface for user
  public static createRefreshToken(user: any): string {
    const payload = {
      sub: user.id,
      version: user.tokenVersion,
    };
    const options = {
      expiresIn: config.jwt.refresh.expiresIn,
      issuer: config.jwt.issuer,
    };

    return sign(payload, config.jwt.refresh.secret, options);
  }

  // public async revokeToken(token: string, user: User): Promise<void> {
  //   const payload = decode(token);
  //   await this.userModel.update({tokenVersion: user.tokenVersion + 1}, {where: {id: payload.sub}, silent: true});
  // }

  // public isTokenRevoked(token: string, user: User): boolean {
  //   const payload = decode(token);
  //   return user.tokenVersion !== payload.version;
  // }

  public async getUserById(id: number): Promise<User> {
    return await this.userModel.findOne({where: {id}});
  }

  public async getUserByEmail(email: string, strategy: LoginStrategy): Promise<User> {
    return await this.userModel.findOne({where: {email, strategy}});
  }

  public async googleSignUp(googleUser: any): Promise<User> {
    const user = await this.getUserByEmail(googleUser.email, LoginStrategy.Google);
    if (user) {
      return user;
    }

    return await this.userModel.create({...googleUser, strategy: LoginStrategy.Google});
  }
}
