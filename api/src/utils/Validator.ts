import {BadRequestException} from '@nestjs/common';
import Joi, {Schema} from 'joi';

export class Validator {
  public static validate(schema: Schema, value: any) {
    const result = schema.validate(value);
    if (result.error) {
      throw new BadRequestException(String(result.error));
    }
  }

  public static validateId(id: string): number {
    const num = Number(id);
    if (isNaN(num)) {
      throw new BadRequestException('ID must be a number');
    }
    return num;
  }


  public static validatePaginatedQuery(query: any) {
    this.validate(Joi.object({
      limit: Joi.number(),
      offset: Joi.number(),
      filter: Joi.any(),
      order: Joi.array().items(Joi.string()),
    }), query);

    return {
      limit: query.limit && query.limit !== '-1' ? Number(query.limit) : undefined,
      offset: query.offset ? Number(query.offset) : undefined,
      order: query.order?.map(item => item.split(':')),
      filter: query.filter ? JSON.parse(query.filter) : undefined,
    };
  }
}
