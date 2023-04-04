import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlist } from './models/playlist.model';

@Module({
  imports: [SequelizeModule.forFeature([Playlist])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
