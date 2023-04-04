import { Module } from '@nestjs/common';
import { LikedVideoService } from './liked_video.service';
import { LikedVideoController } from './liked_video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LikedVideo } from './models/liked_video.model';

@Module({
  imports: [SequelizeModule.forFeature([LikedVideo])],
  controllers: [LikedVideoController],
  providers: [LikedVideoService],
  exports: [LikedVideoService],
})
export class LikedVideoModule {}
