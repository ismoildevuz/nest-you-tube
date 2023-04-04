import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistVideoService } from './playlist_video.service';
import { CreatePlaylistVideoDto } from './dto/create-playlist_video.dto';

@Controller('playlist-video')
export class PlaylistVideoController {
  constructor(private readonly playlistVideoService: PlaylistVideoService) {}

  @Post()
  async create(@Body() createPlaylistVideoDto: CreatePlaylistVideoDto) {
    return this.playlistVideoService.create(createPlaylistVideoDto);
  }

  @Get()
  async findAll() {
    return this.playlistVideoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playlistVideoService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.playlistVideoService.remove(id);
  }
}
