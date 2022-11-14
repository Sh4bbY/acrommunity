import Joi from 'joi';

export interface ITag {
  id: number;
  name: string;
}

const constraints = {
  title: {minLength: 3, maxLength: 30},
};

export const tagValidation = {
  constraints,
  schema: Joi.object({
    name: Joi.string().min(constraints.title.minLength).max(constraints.title.maxLength).required(),
  }),
};
