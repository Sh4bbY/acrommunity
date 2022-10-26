import {AliasableType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op} from 'sequelize';
import {Alias} from '~/models';

@Injectable()
export class AliasService {
  constructor(
    @InjectModel(Alias) private aliasModel: typeof Alias) {
  }

  async createAlias(name: string, aliasableType: AliasableType, aliasableId: number) {
    const record = {name, aliasableType, aliasableId} as any;
    return await this.aliasModel.create(record);
  }

  async deleteAliases(ids: number[]) {
    return await this.aliasModel.destroy({where: {id: {[Op.in]: ids}}});
  }

  async getAliases(aliasableType: AliasableType, aliasableId: number) {
    return await this.aliasModel.findAll({where: {aliasableType, aliasableId}, raw: true});
  }
}
