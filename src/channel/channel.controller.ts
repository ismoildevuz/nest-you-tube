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
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Channel } from './models/channel.model';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { Playlist } from '../playlist/models/playlist.model';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ChannelPlaylistDto } from './dto/channel-playlist.dto';
import { PlaylistVideo } from '../playlist_video/models/playlist_video.model';
import { ChannelAddToPlaylistDto } from './dto/channel-add-to-playlist.dto';

@ApiTags('Channel')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiOperation({ summary: 'Create a new channel' })
  @ApiResponse({ status: 201, type: Channel })
  @UseGuards(JwtAuthActiveGuard)
  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  @ApiOperation({ summary: 'Get all channels' })
  @ApiResponse({ status: 200, type: [Channel] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.channelService.findAll();
  }

  @ApiOperation({ summary: 'Get a channel by ID' })
  @ApiResponse({ status: 200, type: Channel })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.channelService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a channel by ID' })
  @ApiResponse({ status: 200, type: Channel })
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    return this.channelService.update(id, updateChannelDto);
  }

  @ApiOperation({ summary: 'Delete a channel by ID' })
  @ApiResponse({ status: 200, type: Channel })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.channelService.remove(id);
  }

  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiResponse({ status: 201, type: Playlist })
  @UseGuards(JwtAuthActiveGuard)
  @Post('playlist')
  async playlist(
    @CookieGetter('access_token') accessToken: string,
    @Body() create: ChannelPlaylistDto,
  ) {
    return this.channelService.playlist(accessToken, create.name);
  }

  @ApiOperation({ summary: 'Add video to playlist' })
  @ApiResponse({ status: 201, type: PlaylistVideo })
  @UseGuards(JwtAuthActiveGuard)
  @Post('playlist/add')
  async addToPlaylist(
    @CookieGetter('access_token') accessToken: string,
    @Body() create: ChannelAddToPlaylistDto,
  ) {
    return this.channelService.addToPlaylist(
      accessToken,
      create.playlist_id,
      create.video_id,
    );
  }
}
