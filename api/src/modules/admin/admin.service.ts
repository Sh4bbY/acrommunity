import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import fs from 'fs';
import {Alias, Attachment, Pose, Tag, Transition} from '~/models';
import {PT_Attachable, PT_Taggable} from '~/models/pivot';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Pose) private poseModel: typeof Pose,
    @InjectModel(Transition) private transitionModel: typeof Transition,
    @InjectModel(Attachment) private attachmentModel: typeof Attachment,
    @InjectModel(PT_Attachable) private attachableModel: typeof PT_Attachable,
    @InjectModel(PT_Taggable) private taggableModel: typeof PT_Taggable,
    @InjectModel(Tag) private tagModel: typeof Tag,
    @InjectModel(Alias) private aliasModel: typeof Alias,
  ) {
  }

  async backupData(): Promise<void> {
    const poses = await this.exportData();
    const filePath = 'db/data/data-backup.json';
    fs.writeFileSync(filePath, JSON.stringify(poses), 'utf-8');
    Logger.verbose(`Poses-Backup Complete. Written to "${filePath}"`);
  }

  async exportData(): Promise<any> {
    const [poses, transitions, attachments, aliases, tags, attachables, taggables] = await Promise.all([
      this.poseModel.findAll(),
      this.transitionModel.findAll(),
      this.attachmentModel.findAll(),
      this.aliasModel.findAll(),
      this.tagModel.findAll(),
      this.attachableModel.findAll(),
      this.taggableModel.findAll(),
    ]);

    return {
      poses,
      attachments,
      transitions,
      aliases,
      tags,
      attachables,
      taggables,
    };
  }
}
