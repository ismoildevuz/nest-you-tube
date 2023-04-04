import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Channel } from '../../channel/models/channel.model';

interface UserAttrs {
  id: string;
  fullname: string;
  username: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string;
  is_active: boolean;
  activation_link: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttrs> {
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
  email: string;

  @Column({
    type: DataType.STRING,
  })
  fullname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => Channel)
  channel: Channel;
}
