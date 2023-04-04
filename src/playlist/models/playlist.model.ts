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
import sequelize from 'sequelize';
import { PlaylistVideo } from '../../playlist_video/models/playlist_video.model';

interface PlaylistAttrs {
  id: string;
  channel_id: string;
  name: string;
  videos: number;
  views: number;
  updated_at: Date;
}

@Table({ tableName: 'playlist' })
export class Playlist extends Model<Playlist, PlaylistAttrs> {
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
  name: string;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  videos: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  views: number;

  @Column({
    type: DataType.DATE,
    defaultValue: sequelize.literal('NOW()'),
  })
  updated_at: Date;

  @HasMany(() => PlaylistVideo)
  playlistVideo: PlaylistVideo;

  @BelongsTo(() => Channel)
  channel: Channel;
}
