import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'Jams'})
export class Jam extends Model<Jam> {
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
