import { AttachmentType } from '../enums';
export interface IAttachment {
    id: number;
    url: number;
    type: AttachmentType;
    createdAt: Date;
}
export declare const attachmentValidation: {
    constraints: {};
    schema: {};
};
