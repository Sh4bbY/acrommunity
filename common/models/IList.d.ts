import { IFlow } from './IFlow';
import { IPose } from './IPose';
import { ISkill } from './ISkill';
export interface IList {
    id: number;
    name: string;
    description: string;
    poses?: IPose[];
    flows?: IFlow[];
    skills?: ISkill[];
}
export declare const listValidation: {
    constraints: {};
    schema: {};
};
