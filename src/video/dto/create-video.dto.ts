import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6975',
    description: 'The ID of the channel to which the video belongs',
  })
  @IsNotEmpty()
  @IsString()
  channel_id: string;

  @ApiProperty({
    example: 'My Awesome Video',
    description: 'The title of the video',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Check out this amazing video!',
    description: 'The description of the video',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
