import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Playlist } from './models/playlist.model';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiResponse({ status: 201, type: Playlist })
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @ApiOperation({ summary: 'Get all playlists' })
  @ApiResponse({ status: 200, type: [Playlist] })
  @Get()
  async findAll() {
    return this.playlistService.findAll();
  }

  @ApiOperation({ summary: 'Get a playlist by ID' })
  @ApiResponse({ status: 200, type: Playlist })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a playlist by ID' })
  @ApiResponse({ status: 200, type: Playlist })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @ApiOperation({ summary: 'Delete a playlist by ID' })
  @ApiResponse({ status: 200, type: Playlist })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }
}
