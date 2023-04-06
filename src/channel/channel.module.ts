import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from './models/channel.model';
import { JwtModule } from '@nestjs/jwt';
import { PlaylistModule } from '../playlist/playlist.module';
import { PlaylistVideoModule } from '../playlist_video/playlist_video.module';
import { VideoModule } from '../video/video.module';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Channel]),
    JwtModule.register({}),
    LocationModule,
    PlaylistModule,
    PlaylistVideoModule,
    VideoModule,
  ],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
