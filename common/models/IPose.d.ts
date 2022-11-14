import { BasePosition, FlyerPosition, Status } from '../enums';
import { IAlias } from './IAlias';
import { IAttachment } from './IAttachment';
import { IComment } from './IComment';
import { ITag } from './ITag';
export interface IPose {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    persons: number;
    basePosition: BasePosition;
    flyerPosition: FlyerPosition;
    comments?: IComment[];
    aliases?: IAlias[];
    tags?: ITag[];
    attachments?: IAttachment[];
    status?: Status;
}
export declare const poseValidation: {
    constraints: {
        name: {
            minLength: number;
            maxLength: number;
        };
    };
    schema: {};
};
