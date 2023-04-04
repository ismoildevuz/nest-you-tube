import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Location } from '../../location/models/location.model';
import { SocialMediaLink } from '../../social_media_link/models/social_media_link.model';
import sequelize from 'sequelize';
import { Video } from '../../video/models/video.model';
import { Playlist } from '../../playlist/models/playlist.model';
import { Subscription } from '../../subscription/models/subscription.model';

interface ChannelAttrs {
  id: string;
  user_id: string;
  name: string;
  followers: number;
  videos: number;
  description: string;
  is_private: boolean;
  picture: string;
  banner_picture: string;
  contact_email: string;
  location_id: string;
  joined_at: Date;
  views: number;
  is_active: boolean;
}

@Table({ tableName: 'channel' })
export class Channel extends Model<Channel, ChannelAttrs> {
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

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  followers: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  videos: number;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_private: boolean;

  @Column({
    type: DataType.STRING,
  })
  picture: string;

  @Column({
    type: DataType.STRING,
  })
  banner_picture: string;

  @Column({
    type: DataType.STRING,
  })
  contact_email: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.STRING,
  })
  location_id: string;

  @Column({
    type: DataType.DATE,
    defaultValue: sequelize.literal('NOW()'),
  })
  joined_at: Date;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  views: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @HasMany(() => SocialMediaLink)
  socialMediaLink: SocialMediaLink;

  @HasMany(() => Video)
  video: Video;

  @HasMany(() => Playlist)
  playlist: Playlist;

  @HasMany(() => Subscription)
  subscription: Subscription;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Location)
  location: Location;
}
