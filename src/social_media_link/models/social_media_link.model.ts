import {
  DataType,
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Channel } from '../../channel/models/channel.model';

interface SocialMediaLinkAttrs {
  id: string;
  channel_id: string;
  link_name: string;
  link: string;
}

@Table({ tableName: 'social_media_link' })
export class SocialMediaLink extends Model<
  SocialMediaLink,
  SocialMediaLinkAttrs
> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ForeignKey(() => Channel)
  @Column({
    type: DataType.STRING,
  })
  channel_id: string;

  @Column({
    type: DataType.STRING,
  })
  link_name: string;

  @Column({
    type: DataType.STRING,
  })
  link: string;

  @BelongsTo(() => Channel)
  channel: Channel;
}
