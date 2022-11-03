import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({updatedAt: false, createdAt: false})
export class Video extends Model<Video> {
  declare id: number;

  @Column({type: DataType.STRING})
  declare url: string;

  @Column({type: DataType.STRING})
  declare thumbnail: string;

  @Column({type: DataType.TINYINT.UNSIGNED})
  declare persons: string;

  @Column({type: DataType.STRING})
  declare copyright: string;

  @Column({type: DataType.STRING})
  declare bases: number;

  @Column({type: DataType.STRING})
  declare baseType: string;

  @Column({type: DataType.STRING})
  declare mediaId: string;
}
