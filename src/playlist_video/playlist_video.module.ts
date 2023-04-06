import { Module } from '@nestjs/common';
import { PlaylistVideoService } from './playlist_video.service';
import { PlaylistVideoController } from './playlist_video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaylistVideo } from './models/playlist_video.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([PlaylistVideo]),
    JwtModule.register({}),
  ],
  controllers: [PlaylistVideoController],
  providers: [PlaylistVideoService],
  exports: [PlaylistVideoService],
})
export class PlaylistVideoModule {}
