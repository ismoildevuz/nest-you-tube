import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSocialMediaLinkDto {
  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6975',
    description: 'The ID of the channel that owns the social media link',
  })
  @IsNotEmpty()
  @IsString()
  channel_id: string;

  @ApiProperty({
    example: 'Twitter',
    description:
      'The name of the social media platform (e.g. Twitter, Facebook, Instagram)',
  })
  @IsNotEmpty()
  @IsString()
  link_name: string;

  @ApiProperty({
    example: 'https://twitter.com/example',
    description: "The URL of the channel's social media profile",
  })
  @IsNotEmpty()
  @IsString()
  link: string;
}
