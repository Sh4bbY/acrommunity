import {ListableType, MarkableType, MarkType} from '@acrommunity/common';
import {ForbiddenException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op} from 'sequelize';
import {Attachment, Flow, Image, Jam, List, Pose, Skill, User, Video} from '~/models';
import {PT_Listable, PT_Markable} from '~/models/pivot';

@Injectable()
export class MyService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(List) private listModel: typeof List,
    @InjectModel(PT_Listable) private ptListableModel: typeof PT_Listable,
    @InjectModel(PT_Markable) private ptMarkableModel: typeof PT_Markable,
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Flow) private flowModel: typeof Flow,
    @InjectModel(Skill) private skillModel: typeof Skill,
    @InjectModel(Jam) private jamModel: typeof Jam,
    @InjectModel(Image) private imageModel: typeof Image,
    @InjectModel(Video) private videoModel: typeof Video,
  ) {
  }

  async getUserState(userId: number) {
    const [lists, marks, jams] = await Promise.all([
      this.listModel.findAll({where: {userId}, include: [Pose, Flow, Skill]}),
      this.ptMarkableModel.findAll({where: {userId}}),
      this.jamModel.findAll({where: {creatorId: userId}}),
    ]);
    return {lists, marks, jams};
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

  async getMarkedItem(userId: number, type: MarkType) {

    const markables = await this.ptMarkableModel.findAll({where: {userId, type}});
    const poseIds = markables.filter(markable => markable.markableType === MarkableType.Pose).map(markable => markable.markableId);
    const flowIds = markables.filter(markable => markable.markableType === MarkableType.Flow).map(markable => markable.markableId);
    const skillIds = markables.filter(markable => markable.markableType === MarkableType.Skill).map(markable => markable.markableId);
    const imageIds = markables.filter(markable => markable.markableType === MarkableType.Image).map(markable => markable.markableId);
    const videoIds = markables.filter(markable => markable.markableType === MarkableType.Video).map(markable => markable.markableId);

    const [poses, flows, skills, images, videos] = await Promise.all([
      this.poseModel.findAll({where: {id: {[Op.in]: poseIds}}, include: [Attachment]}),
      this.flowModel.findAll({where: {id: {[Op.in]: flowIds}}, include: [Attachment]}),
      this.skillModel.findAll({where: {id: {[Op.in]: skillIds}}, include: [Attachment]}),
      this.imageModel.findAll({where: {id: {[Op.in]: imageIds}}}),
      this.videoModel.findAll({where: {id: {[Op.in]: videoIds}}}),
    ]);
    return {poses, flows, skills, images, videos};
  }


  async deleteMark(userId: number, markableType: MarkableType, markableId: number, type: MarkType) {
    await this.ptMarkableModel.destroy({where: {userId, markableType, markableId, type}});
  }
}
