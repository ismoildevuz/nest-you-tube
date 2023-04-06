import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PlaylistVideoService } from './playlist_video.service';
import { CreatePlaylistVideoDto } from './dto/create-playlist_video.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaylistVideo } from './models/playlist_video.model';

@ApiTags('Playlist Video')
@Controller('playlist-video')
export class PlaylistVideoController {
  constructor(private readonly playlistVideoService: PlaylistVideoService) {}

  @ApiOperation({ summary: 'Create a new playlist video' })
  @ApiResponse({ status: 201, type: PlaylistVideo })
  @Post()
  async create(@Body() createPlaylistVideoDto: CreatePlaylistVideoDto) {
    return this.playlistVideoService.create(createPlaylistVideoDto);
  }

  @ApiOperation({ summary: 'Get all playlist videos' })
  @ApiResponse({ status: 200, type: [PlaylistVideo] })
  @Get()
  async findAll() {
    return this.playlistVideoService.findAll();
  }

  @ApiOperation({ summary: 'Get a single playlist video by ID' })
  @ApiResponse({ status: 200, type: PlaylistVideo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playlistVideoService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a playlist video by ID' })
  @ApiResponse({ status: 200, type: PlaylistVideo })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.playlistVideoService.remove(id);
  }
}
