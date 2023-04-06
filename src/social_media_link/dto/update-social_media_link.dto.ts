import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSocialMediaLinkDto {
  @ApiProperty({
    example: 'Twitter',
    description:
      'The name of the social media platform (e.g. Twitter, Facebook, Instagram)',
  })
  @IsNotEmpty()
  @IsString()
  link_name?: string;

  @ApiProperty({
    example: 'https://twitter.com/example',
    description: "The URL of the channel's social media profile",
  })
  @IsNotEmpty()
  @IsString()
  link?: string;
}
