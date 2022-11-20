import {JamStatus, RecursionType} from '@acrommunity/common';
import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {User} from '~/models/User';

@Table({tableName: 'Jams'})
export class Jam extends Model<Jam> {
  declare id: number;

  @Column({type: DataType.INTEGER.UNSIGNED})
  declare creatorId: number;

  @BelongsTo(() => User, 'creatorId')
  declare creator: User;

  @Column({type: DataType.STRING})
  declare title: string;

  @Column({type: DataType.STRING})
  declare description: string;

  @Column({type: DataType.STRING})
  declare recursionType: RecursionType;

  @Column({type: DataType.STRING})
  declare contact: string;

  @Column({type: DataType.GEOMETRY('POINT')})
  declare latlng: any;

  @Column({type: DataType.STRING})
  declare address: string;

  @Column({type: DataType.STRING})
  declare locationInfo: string;

  @Column({type: DataType.STRING})
  declare status: JamStatus;

  @Column({type: DataType.DATE})
  declare startDate: Date;

  @Column({type: DataType.DATE})
  declare endDate: Date;
}
