import { Module } from '@nestjs/common';
import { PlaylistVideoService } from './playlist_video.service';
import { PlaylistVideoController } from './playlist_video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaylistVideo } from './models/playlist_video.model';

@Module({
  imports: [SequelizeModule.forFeature([PlaylistVideo])],
  controllers: [PlaylistVideoController],
  providers: [PlaylistVideoService],
  exports: [PlaylistVideoService],
})
export class PlaylistVideoModule {}
