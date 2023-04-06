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
import { SocialMediaLinkService } from './social_media_link.service';
import { CreateSocialMediaLinkDto } from './dto/create-social_media_link.dto';
import { UpdateSocialMediaLinkDto } from './dto/update-social_media_link.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocialMediaLink } from './models/social_media_link.model';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('Social Media Link')
@Controller('social-media-link')
export class SocialMediaLinkController {
  constructor(
    private readonly socialMediaLinkService: SocialMediaLinkService,
  ) {}

  @ApiOperation({ summary: 'Create a new social media link' })
  @ApiResponse({ status: 201, type: SocialMediaLink })
  @UseGuards(JwtAuthActiveGuard)
  @Post()
  async create(@Body() createSocialMediaLinkDto: CreateSocialMediaLinkDto) {
    return this.socialMediaLinkService.create(createSocialMediaLinkDto);
  }

  @ApiOperation({ summary: 'Get all social media links' })
  @ApiResponse({ status: 200, type: [SocialMediaLink] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.socialMediaLinkService.findAll();
  }

  @ApiOperation({ summary: 'Get a social media link by ID' })
  @ApiResponse({ status: 200, type: SocialMediaLink })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.socialMediaLinkService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a social media link by ID' })
  @ApiResponse({ status: 200, type: SocialMediaLink })
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSocialMediaLinkDto: UpdateSocialMediaLinkDto,
  ) {
    return this.socialMediaLinkService.update(id, updateSocialMediaLinkDto);
  }

  @ApiOperation({ summary: 'Delete a social media link by ID' })
  @ApiResponse({ status: 200, type: SocialMediaLink })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.socialMediaLinkService.remove(id);
  }
}
