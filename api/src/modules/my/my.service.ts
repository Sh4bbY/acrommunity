import {ListableType} from '@acrommunity/common';
import {ForbiddenException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Flow, List, Pose, Skill, User} from '~/models';
import {PT_Listable, PT_Markable} from '~/models/pivot';

@Injectable()
export class MyService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(List) private listModel: typeof List,
    @InjectModel(PT_Listable) private ptListableModel: typeof PT_Listable,
    @InjectModel(PT_Markable) private ptMarkableModel: typeof PT_Markable,
  ) {
  }

  async getUserState(userId: number) {
    const [lists, marks] = await Promise.all([
      this.listModel.findAll({where: {userId}, include: [Pose, Flow, Skill]}),
      this.ptMarkableModel.findAll({where: {userId}}),
    ]);
    return {lists, marks};
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

  async addItemToList(userId: number, listId: number, body: any) {
    const record = {listId, listableId: body.listableId, listableType: body.listableType} as any;
    return await this.ptListableModel.create(record);
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

  // -------- Marks

  async createMark(userId: number, body: any) {
    return await this.ptMarkableModel.create({userId, markableType: body.markableType, markableId: body.markableId, type: body.type} as any);
  }

  async deleteMark(userId: number, markableType: string, markableId: number) {
    await this.ptMarkableModel.destroy({where: {userId, markableType, markableId}});
  }
}
