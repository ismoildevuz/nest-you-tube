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

@Controller('social-media-link')
export class SocialMediaLinkController {
  constructor(
    private readonly socialMediaLinkService: SocialMediaLinkService,
  ) {}

  @Post()
  async create(@Body() createSocialMediaLinkDto: CreateSocialMediaLinkDto) {
    return this.socialMediaLinkService.create(createSocialMediaLinkDto);
  }

  @Get()
  async findAll() {
    return this.socialMediaLinkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.socialMediaLinkService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSocialMediaLinkDto: UpdateSocialMediaLinkDto,
  ) {
    return this.socialMediaLinkService.update(id, updateSocialMediaLinkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.socialMediaLinkService.remove(id);
  }
}
