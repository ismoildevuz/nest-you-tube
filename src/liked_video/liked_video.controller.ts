import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LikedVideoService } from './liked_video.service';
import { CreateLikedVideoDto } from './dto/create-liked_video.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikedVideo } from './models/liked_video.model';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@ApiTags('Liked Video')
@Controller('liked-video')
export class LikedVideoController {
  constructor(private readonly likedVideoService: LikedVideoService) {}

  @ApiOperation({ summary: 'Create a new liked video' })
  @ApiResponse({ status: 201, type: LikedVideo })
  @UseGuards(JwtAuthActiveGuard)
  @Post()
  async create(
    @CookieGetter('refresh_token') refreshToken: string,
    @Body() createLikedVideoDto: CreateLikedVideoDto,
  ) {
    return this.likedVideoService.create(createLikedVideoDto, refreshToken);
  }

  @ApiOperation({ summary: 'Get all liked videos' })
  @ApiResponse({ status: 200, type: [LikedVideo] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.likedVideoService.findAll();
  }

  @ApiOperation({ summary: 'Get a liked video by ID' })
  @ApiResponse({ status: 200, type: LikedVideo })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.likedVideoService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a liked video by ID' })
  @ApiResponse({ status: 200, type: LikedVideo })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(
    @CookieGetter('refresh_token') refreshToken: string,
    @Param('id') id: string,
  ) {
    return this.likedVideoService.remove(id, refreshToken);
  }
}
