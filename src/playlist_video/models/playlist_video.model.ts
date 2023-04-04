import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Playlist } from '../../playlist/models/playlist.model';
import { Video } from '../../video/models/video.model';

interface PlaylistVideoAttrs {
  id: string;
  playlist_id: string;
  video_id: string;
}

@Table({ tableName: 'playlist_video' })
export class PlaylistVideo extends Model<PlaylistVideo, PlaylistVideoAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ForeignKey(() => Playlist)
  @Column({
    type: DataType.STRING,
  })
  playlist_id: string;

  @ForeignKey(() => Video)
  @Column({
    type: DataType.STRING,
  })
  video_id: string;

  @BelongsTo(() => Playlist)
  playlist: Playlist;

  @BelongsTo(() => Video)
  video: Video;
}
