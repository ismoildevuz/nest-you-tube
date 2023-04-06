import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateChannelDto {
  @ApiProperty({
    example: "John's Channel",
    description: 'The full name of the channel',
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'A channel created by John Doe',
    description: 'The description of the channel',
  })
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://path.to/picture.png',
    description: "The URL of the channel's profile picture",
  })
  @IsNotEmpty()
  @IsString()
  picture?: string;

  @ApiProperty({
    example: 'https://path.to/banner.png',
    description: "The URL of the channel's banner picture",
  })
  @IsNotEmpty()
  @IsString()
  banner_picture?: string;

  @ApiProperty({
    example: 'contact@example.com',
    description: 'The contact email for the channel',
  })
  @IsNotEmpty()
  @IsEmail()
  contact_email?: string;

  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6978',
    description: 'The location ID for the channel',
  })
  @IsNotEmpty()
  @IsString()
  location_id?: string;
}
