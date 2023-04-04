import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Channel } from '../../channel/models/channel.model';

interface SubscriptionAttrs {
  id: string;
  user_id: string;
  channel_id: string;
}

@Table({ tableName: 'subscription' })
export class Subscription extends Model<Subscription, SubscriptionAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
  })
  user_id: string;

  @ForeignKey(() => Channel)
  @Column({
    type: DataType.STRING,
  })
  channel_id: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Channel)
  channel: Channel;
}
