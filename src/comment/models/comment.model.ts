import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Video } from '../../video/models/video.model';
import sequelize from 'sequelize';

interface CommentAttrs {
  id: string;
  user_id: string;
  video_id: string;
  created_at: Date;
  body: string;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentAttrs> {
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

  @Column({
    type: DataType.DATE,
    defaultValue: sequelize.literal('NOW()'),
  })
  created_at: Date;

  @Column({
    type: DataType.TEXT,
  })
  body: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Video)
  video: Video;
}
