import Joi from 'joi';
export interface IUser {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
    password: string;
    avatar: string;
    tokenVersion: number;
}
export declare const userValidation: {
    constraints: {
        username: {
            minLength: number;
            maxLength: number;
        };
        email: {
            maxLength: number;
        };
        password: {
            minLength: number;
        };
    };
    schema: {
        update: Joi.Schema<any>;
        email: Joi.Schema<any>;
        password: Joi.Schema<any>;
    };
};
