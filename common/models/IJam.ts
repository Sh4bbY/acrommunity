import Joi from 'joi';

export interface IJam {
  id: number;
  title: string;
  description: string;
  date: string;
}

const constraints = {
  title: {minLength: 3, maxLength: 30},
  description: {maxLength: 500},
};

export const jamValidation = {
  constraints,
  schema: {
    create: Joi.compile(Joi.object({
      title: Joi.string().min(constraints.title.minLength).max(constraints.title.maxLength).required(),
      description: Joi.string().max(constraints.description.maxLength).required(),
    })),
  },
};
