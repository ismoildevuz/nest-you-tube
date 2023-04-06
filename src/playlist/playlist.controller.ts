import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Playlist } from './models/playlist.model';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiResponse({ status: 201, type: Playlist })
  @UseGuards(JwtAuthActiveGuard)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @ApiOperation({ summary: 'Get all playlists' })
  @ApiResponse({ status: 200, type: [Playlist] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.playlistService.findAll();
  }

  @ApiOperation({ summary: 'Get a playlist by ID' })
  @ApiResponse({ status: 200, type: Playlist })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a playlist by ID' })
  @ApiResponse({ status: 200, type: Playlist })
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @ApiOperation({ summary: 'Delete a playlist by ID' })
  @ApiResponse({ status: 200, type: Playlist })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }
}
