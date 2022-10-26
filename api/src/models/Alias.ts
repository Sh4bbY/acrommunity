import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({updatedAt: false, createdAt: false})
export class Alias extends Model<Alias> {
  declare id: number;

  @Column({type: DataType.STRING})
  declare name: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  declare aliasableId: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare aliasableType: string;
}
