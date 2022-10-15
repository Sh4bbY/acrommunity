import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from '~/models';
import {Crypt} from '~/utils';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User) private userModel: typeof User) {
  }

  async updateProfile(userId: number, user: any) {
    return await this.userModel.update(user, {where: {id: userId}});
  }

  async updateEmail(userId: number, email: string) {
    return await this.userModel.update({email: email}, {where: {id: userId}});
  }

  async updatePassword(userId: number, password: string) {
    return await this.userModel.update({password: await Crypt.hashPassword(password)}, {where: {id: userId}});
  }
}
