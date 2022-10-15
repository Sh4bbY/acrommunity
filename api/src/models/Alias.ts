import {Column, DataType, Model, Table} from 'sequelize-typescript';

export interface AliasData {
  id: number;
  aliasableId: number;
  aliasableType: string;
  name: string;
}

const constraints = {
  name: {minLength: 3, maxLength: 30},
};

export const aliasValidation = {
  constraints,
  schema: {},
};

@Table({updatedAt: false, createdAt: false})
export class Alias extends Model<Alias> {
  public static validation = aliasValidation;

  declare id: number;

  @Column({type: DataType.STRING})
  declare name: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  declare aliasableId: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare aliasableType: string;
}
