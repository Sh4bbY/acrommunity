import {ForbiddenException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ListableType} from '~/enums';
import {Flow, List, Pose, Skill, User} from '~/models';
import {PT_Listable} from '~/models/pivot';

@Injectable()
export class MyService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(List) private listModel: typeof List,
    @InjectModel(PT_Listable) private ptListableModel: typeof PT_Listable) {
  }

  async getLists(userId: number) {
    return await this.listModel.findAll({
      where: {userId},
      include: [Pose, Flow, Skill],
    });
  }

  async addListableToList(userId: number, listId: number, listableType: ListableType, listableId: number) {
    const list = await this.listModel.findOne({where: {id: listId, userId}});
    if (!list) {
      throw new ForbiddenException('Not Allowed');
    }

    const entry = {listId, listableType, listableId} as any;
    await this.ptListableModel.create(entry);
  }

  async deleteListableFromList(userId: number, listId: number, listableType: ListableType, listableId: number) {
    const list = await this.listModel.findOne({where: {id: listId, userId}});
    if (!list) {
      throw new ForbiddenException('Not Allowed');
    }

    await this.ptListableModel.destroy({
      where: {listId, listableType, listableId},
    });
  }

  async addItemsToList(userId: number, listId: number, body: any) {
    const records = body.listableIds.map(listableId => ({listId, listableId, listableType: body.listableType}));
    return await this.ptListableModel.bulkCreate(records);
  }

  async updateList(userId: number, listId: number, body: any) {
    await this.listModel.update(body, {where: {id: listId, userId}});
  }

  async createList(userId: number, body: any) {
    return await this.listModel.create(Object.assign({userId}, body));
  }

  async deleteList(userId: number, listId: number) {
    const list = await this.listModel.findOne({where: {id: listId, userId}});
    if (!list) {
      throw new ForbiddenException('Not Allowed');
    }

    await this.ptListableModel.destroy({where: {listId}});
    await this.listModel.destroy({where: {id: listId, userId}});
  }
}
