import { DataType, Table, Model, Column, HasMany } from 'sequelize-typescript';
import { Channel } from '../../channel/models/channel.model';

interface LocationAttrs {
  id: string;
  country: string;
}

@Table({ tableName: 'location' })
export class Location extends Model<Location, LocationAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  country: string;

  @HasMany(() => Channel)
  channel: Channel;
}
