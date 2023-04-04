import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Video } from '../../video/models/video.model';

interface LikedVideoAttrs {
  id: string;
  user_id: string;
  video_id: string;
}

@Table({ tableName: 'liked_video' })
export class LikedVideo extends Model<LikedVideo, LikedVideoAttrs> {
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

  @ForeignKey(() => Video)
  @Column({
    type: DataType.STRING,
  })
  video_id: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Video)
  video: Video;
}
