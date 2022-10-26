import {userValidation} from '@acrommunity/common';
import Joi from 'joi';

export const registerSchema: Joi.Schema = Joi.compile(Joi.object({
  email: Joi.string().email().max(userValidation.constraints.email.maxLength).required(),
  password: Joi.string().min(userValidation.constraints.password.minLength).required(),
  username: Joi.string().min(userValidation.constraints.username.minLength).max(userValidation.constraints.username.maxLength).required(),
}));
