import { IAlias } from './IAlias';
import { IAttachment } from './IAttachment';
import { IComment } from './IComment';
import { ITag } from './ITag';
export interface IFlow {
    id: number;
    name: string;
    description: string;
    difficulty: string;
    comments?: IComment[];
    aliases?: IAlias[];
    tags?: ITag[];
    attachments?: IAttachment[];
}
export declare const flowValidation: {
    constraints: {
        name: {
            minLength: number;
            maxLength: number;
        };
    };
    schema: {};
};
