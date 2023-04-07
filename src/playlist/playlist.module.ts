import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlist } from './models/playlist.model';
import { JwtModule } from '@nestjs/jwt';
import { Channel } from '../channel/models/channel.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Playlist, Channel]),
    JwtModule.register({}),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
