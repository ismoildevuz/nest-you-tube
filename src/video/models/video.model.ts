import sequelize from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Channel } from '../../channel/models/channel.model';
import { LikedVideo } from '../../liked_video/models/liked_video.model';
import { Comment } from '../../comment/models/comment.model';
import { PlaylistVideo } from '../../playlist_video/models/playlist_video.model';

interface VideoAttrs {
  id: string;
  channel_id: string;
  title: string;
  likes: number;
  views: number;
  created_at: Date;
  description: string;
  video_length: number;
  is_active: boolean;
}

@Table({ tableName: 'video' })
export class Video extends Model<Video, VideoAttrs> {
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
  title: string;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  likes: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  views: number;

  @Column({
    type: DataType.DATE,
    defaultValue: sequelize.literal('NOW()'),
  })
  created_at: Date;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  video_length: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @HasMany(() => LikedVideo)
  likedVideo: LikedVideo;

  @HasMany(() => Comment)
  comment: Comment;

  @HasMany(() => PlaylistVideo)
  playlistVideo: PlaylistVideo;

  @BelongsTo(() => Channel)
  channel: Channel;
}
