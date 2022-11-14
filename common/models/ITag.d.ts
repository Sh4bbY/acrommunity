import Joi from 'joi';
export interface ITag {
    id: number;
    name: string;
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
