import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Video } from './models/video.model';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new video' })
  @ApiResponse({ status: 201, type: Video })
  async create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all videos' })
  @ApiResponse({ status: 200, type: [Video] })
  async findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a video by ID' })
  @ApiResponse({ status: 200, type: Video })
  async findOne(@Param('id') id: string) {
    return this.videoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a video by ID' })
  @ApiResponse({ status: 200, type: Video })
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return this.videoService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a video by ID' })
  @ApiResponse({ status: 200, type: Video })
  async remove(@Param('id') id: string) {
    return this.videoService.remove(id);
  }
}
