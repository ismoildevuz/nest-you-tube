import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SocialMediaLinkService } from './social_media_link.service';
import { CreateSocialMediaLinkDto } from './dto/create-social_media_link.dto';
import { UpdateSocialMediaLinkDto } from './dto/update-social_media_link.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocialMediaLink } from './models/social_media_link.model';

@ApiTags('Social Media Link')
@Controller('social-media-link')
export class SocialMediaLinkController {
  constructor(
    private readonly socialMediaLinkService: SocialMediaLinkService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new social media link' })
  @ApiResponse({ status: 201, type: SocialMediaLink })
  async create(@Body() createSocialMediaLinkDto: CreateSocialMediaLinkDto) {
    return this.socialMediaLinkService.create(createSocialMediaLinkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all social media links' })
  @ApiResponse({ status: 200, type: [SocialMediaLink] })
  async findAll() {
    return this.socialMediaLinkService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a social media link by ID' })
  @ApiResponse({ status: 200, type: SocialMediaLink })
  async findOne(@Param('id') id: string) {
    return this.socialMediaLinkService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a social media link by ID' })
  @ApiResponse({ status: 200, type: SocialMediaLink })
  async update(
    @Param('id') id: string,
    @Body() updateSocialMediaLinkDto: UpdateSocialMediaLinkDto,
  ) {
    return this.socialMediaLinkService.update(id, updateSocialMediaLinkDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a social media link by ID' })
  @ApiResponse({ status: 200, type: SocialMediaLink })
  async remove(@Param('id') id: string) {
    return this.socialMediaLinkService.remove(id);
  }
}
