import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Channel } from './models/channel.model';

@ApiTags('Channel')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiOperation({ summary: 'Create a new channel' })
  @ApiResponse({ status: 201, type: Channel })
  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  @ApiOperation({ summary: 'Get all channels' })
  @ApiResponse({ status: 200, type: [Channel] })
  @Get()
  async findAll() {
    return this.channelService.findAll();
  }

  @ApiOperation({ summary: 'Get a channel by ID' })
  @ApiResponse({ status: 200, type: Channel })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.channelService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a channel by ID' })
  @ApiResponse({ status: 200, type: Channel })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    return this.channelService.update(id, updateChannelDto);
  }

  @ApiOperation({ summary: 'Delete a channel by ID' })
  @ApiResponse({ status: 200, type: Channel })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.channelService.remove(id);
  }
}
