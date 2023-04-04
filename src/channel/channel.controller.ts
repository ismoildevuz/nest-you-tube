import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  @Get()
  async findAll() {
    return this.channelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.channelService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelService.update(id, updateChannelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.channelService.remove(id);
  }
}
