import Joi from 'joi';
export interface IJam {
    id: number;
    title: string;
    description: string;
    date: string;
}
export declare const jamValidation: {
    constraints: {
        title: {
            minLength: number;
            maxLength: number;
        };
        description: {
            maxLength: number;
        };
    };
    schema: {
        create: Joi.Schema<any>;
    };
};
