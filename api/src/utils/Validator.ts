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
    }), query);
  }
}
