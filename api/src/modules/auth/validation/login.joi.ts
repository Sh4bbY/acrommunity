import Joi from 'joi';
import {userValidation} from '@acrommunity/common';

export const loginSchema: Joi.Schema = Joi.compile(Joi.object({
  email: Joi.string().email().max(userValidation.constraints.email.maxLength).required(),
  password: Joi.string().min(userValidation.constraints.password.minLength).required(),
}));
