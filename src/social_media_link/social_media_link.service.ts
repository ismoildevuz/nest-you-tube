import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSocialMediaLinkDto } from './dto/create-social_media_link.dto';
import { UpdateSocialMediaLinkDto } from './dto/update-social_media_link.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialMediaLink } from './models/social_media_link.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class SocialMediaLinkService {
  constructor(
    @InjectModel(SocialMediaLink)
    private socialMediaLinkRepository: typeof SocialMediaLink,
  ) {}

  async create(createSocialMediaLinkDto: CreateSocialMediaLinkDto) {
    return this.socialMediaLinkRepository.create({
      id: uuidv4(),
      ...createSocialMediaLinkDto,
    });
  }

  async findAll() {
    return this.socialMediaLinkRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const socialMediaLink = await this.socialMediaLinkRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!socialMediaLink) {
      throw new HttpException(
        'Social-Media Link not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return socialMediaLink;
  }

  async update(id: string, updateSocialMediaLinkDto: UpdateSocialMediaLinkDto) {
    const socialMediaLink = await this.findOne(id);
    const updatedSocialMediaLink = await this.socialMediaLinkRepository.update(
      updateSocialMediaLinkDto,
      {
        where: { id },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async remove(id: string) {
    const socialMediaLink = await this.findOne(id);
    const deletedSocialMediaLink = await this.socialMediaLinkRepository.destroy(
      {
        where: { id },
      },
    );
    return { message: 'Social-Media Link deleted' };
  }
}
