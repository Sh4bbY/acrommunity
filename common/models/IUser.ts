import tlds from '@sideway/address/lib/tlds';
import Joi from 'joi';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  tokenVersion: number;
}

const constraints = {
  username: {minLength: 3, maxLength: 30},
  email: {maxLength: 100},
  password: {minLength: 6},
};

export const userValidation = {
  constraints,
  schema: {
    update: Joi.compile(Joi.object({
      username: Joi.string().min(constraints.username.minLength).max(constraints.username.maxLength).required(),
    })),
    email: Joi.compile(Joi.object({
      email: Joi.string().email({tlds: {allow: tlds}}).max(constraints.email.maxLength).required(),
    })),
    password: Joi.compile(Joi.object({
      password: Joi.string().min(constraints.password.minLength).required(),
    })),
  },
};

