import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { LikedVideoService } from './liked_video.service';
import { CreateLikedVideoDto } from './dto/create-liked_video.dto';

@Controller('liked-video')
export class LikedVideoController {
  constructor(private readonly likedVideoService: LikedVideoService) {}

  @Post()
  async create(@Body() createLikedVideoDto: CreateLikedVideoDto) {
    return this.likedVideoService.create(createLikedVideoDto);
  }

  @Get()
  async findAll() {
    return this.likedVideoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.likedVideoService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.likedVideoService.remove(id);
  }
}
