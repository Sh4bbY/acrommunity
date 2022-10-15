import Joi from 'joi';
import {Column, DataType, Model, Table} from 'sequelize-typescript';

export interface JamData {
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

@Table({tableName: 'Jams'})
export class Jam extends Model<Jam> {
  public static validation = jamValidation;

  declare id: number;

  @Column({type: DataType.STRING})
  declare title: string;

  @Column({type: DataType.STRING})
  declare description: string;

  @Column({type: DataType.DATE})
  declare startDate: Date;

  @Column({type: DataType.DATE})
  declare endDate: Date;
}
