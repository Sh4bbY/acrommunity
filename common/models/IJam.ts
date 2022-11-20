import Joi from 'joi';
import {JamStatus, RecursionType} from '../enums';

export interface IJam {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  contact: string;
  address: string;
  locationInfo: string;
  recursionType: RecursionType;
  latlng: { coordinates: number[] };
  creatorId: string;
  creator?: string;
  status: JamStatus;
  updatedAt: string;
  createdAt: string;
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
