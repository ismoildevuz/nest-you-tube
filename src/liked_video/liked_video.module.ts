import { Module } from '@nestjs/common';
import { LikedVideoService } from './liked_video.service';
import { LikedVideoController } from './liked_video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LikedVideo } from './models/liked_video.model';
import { JwtModule } from '@nestjs/jwt';
import { VideoModule } from '../video/video.module';
import { User } from '../user/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([LikedVideo, User]),
    JwtModule.register({}),
    VideoModule,
  ],
  controllers: [LikedVideoController],
  providers: [LikedVideoService],
  exports: [LikedVideoService],
})
export class LikedVideoModule {}
