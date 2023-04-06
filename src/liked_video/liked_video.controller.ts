import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LikedVideoService } from './liked_video.service';
import { CreateLikedVideoDto } from './dto/create-liked_video.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikedVideo } from './models/liked_video.model';

@ApiTags('Liked Video')
@Controller('liked-video')
export class LikedVideoController {
  constructor(private readonly likedVideoService: LikedVideoService) {}

  @ApiOperation({ summary: 'Create a new liked video' })
  @ApiResponse({ status: 201, type: LikedVideo })
  @Post()
  async create(@Body() createLikedVideoDto: CreateLikedVideoDto) {
    return this.likedVideoService.create(createLikedVideoDto);
  }

  @ApiOperation({ summary: 'Get all liked videos' })
  @ApiResponse({ status: 200, type: [LikedVideo] })
  @Get()
  async findAll() {
    return this.likedVideoService.findAll();
  }

  @ApiOperation({ summary: 'Get a liked video by ID' })
  @ApiResponse({ status: 200, type: LikedVideo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.likedVideoService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a liked video by ID' })
  @ApiResponse({ status: 200, type: LikedVideo })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.likedVideoService.remove(id);
  }
}
