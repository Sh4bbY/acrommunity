import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import fs from 'fs';
import {Alias, Attachment, Flow, Image, Pose, Skill, Tag, Transition, User, Video} from '~/models';
import {PT_Attachable, PT_Taggable} from '~/models/pivot';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Skill) private skillModel: typeof Skill,
    @InjectModel(Flow) private flowModel: typeof Flow,
    @InjectModel(Transition) private transitionModel: typeof Transition,
    @InjectModel(Attachment) private attachmentModel: typeof Attachment,
    @InjectModel(PT_Attachable) private attachableModel: typeof PT_Attachable,
    @InjectModel(PT_Taggable) private taggableModel: typeof PT_Taggable,
    @InjectModel(Tag) private tagModel: typeof Tag,
    @InjectModel(Alias) private aliasModel: typeof Alias,
    @InjectModel(Image) private imageModel: typeof Image,
    @InjectModel(Video) private videoModel: typeof Video,
    @InjectModel(User) private userModel: typeof User,
  ) {
  }

  async updateUser(id: number, data: any): Promise<void> {
    await this.userModel.update(data, {where: {id}});
  }

  async backupData(): Promise<void> {
    const poses = await this.exportData();
    const filePath = fs.existsSync('db') ? 'db/data/data-backup.json' : 'dist/db/data/data-backup.json';
    fs.writeFileSync(filePath, JSON.stringify(poses), 'utf-8');
    Logger.verbose(`Poses-Backup Complete. Written to "${filePath}"`);
  }

  async exportData(): Promise<any> {
    const [poses, flows, skills, transitions, attachments, aliases, tags, attachables, taggables] = await Promise.all([
      this.poseModel.findAll(),
      this.flowModel.findAll(),
      this.skillModel.findAll(),
      this.transitionModel.findAll(),
      this.attachmentModel.findAll(),
      this.aliasModel.findAll(),
      this.tagModel.findAll(),
      this.attachableModel.findAll(),
      this.taggableModel.findAll(),
    ]);

    return {
      poses,
      flows,
      skills,
      attachments,
      transitions,
      aliases,
      tags,
      attachables,
      taggables,
    };
  }

  async getInstagramAccounts(): Promise<any> {
    const [images, videos] = await Promise.all([
      this.imageModel.findAll({raw: true}),
      this.videoModel.findAll({raw: true})]);

    const accounts = [];
    images.forEach(image => {
      if (!accounts.includes(image.copyright)) {
        accounts.push(image.copyright);
      }
    });

    videos.forEach(video => {
      if (!accounts.includes(video.copyright)) {
        accounts.push(video.copyright);
      }
    });

    return accounts;
  }
}
