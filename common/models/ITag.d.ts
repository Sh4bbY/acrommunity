import Joi from 'joi';
export interface ITag {
    id: number;
    name: string;
    createdAt: Date;
}
export declare const tagValidation: {
    constraints: {
        title: {
            minLength: number;
            maxLength: number;
        };
    };
    schema: Joi.ObjectSchema<any>;
};
