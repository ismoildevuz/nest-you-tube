import { Module } from '@nestjs/common';
import { SocialMediaLinkService } from './social_media_link.service';
import { SocialMediaLinkController } from './social_media_link.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialMediaLink } from './models/social_media_link.model';

@Module({
  imports: [SequelizeModule.forFeature([SocialMediaLink])],
  controllers: [SocialMediaLinkController],
  providers: [SocialMediaLinkService],
  exports: [SocialMediaLinkService],
})
export class SocialMediaLinkModule {}
