import {AttachableType, AttachmentType} from '@acrommunity/common';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Attachment} from '~/models';
import {PT_Attachable} from '~/models/pivot';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectModel(Attachment) private attachmentModel: typeof Attachment,
    @InjectModel(PT_Attachable) private ptAttachableModel: typeof PT_Attachable) {
  }

  async addAttachment(url: string, attachableType: AttachableType, attachableId: number) {
    const type = AttachmentService.getAttachmentType(url);
    const attachment = await this.attachmentModel.create({url, type} as any);
    const entry = {attachmentId: attachment.id, attachableType, attachableId} as any;
    const attachable = await this.ptAttachableModel.create(entry);
    attachable.setDataValue('attachment', attachment);
    return attachable;
  }

  async getAttachables(attachableType: AttachableType, attachableId: number) {
    return await this.ptAttachableModel.findAll({where: {attachableType, attachableId}, include: [Attachment]});
  }

  async deleteAttachable(attachableType: AttachableType, attachableId: number, attachmentId: number) {
    await this.ptAttachableModel.destroy({where: {attachableType, attachableId, attachmentId}});
    await this.attachmentModel.destroy({where: {id: attachmentId}});
  }

  static getAttachmentType(url: string): AttachmentType {
    if (url.includes('youtube')) {
      return AttachmentType.YouTube;
    }
    if (url.includes('instagram')) {
      return AttachmentType.Instagram;
    }

    return AttachmentType.Image;
  }
}
