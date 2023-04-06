import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVideoDto {
  @ApiProperty({
    example: 'My Awesome Video',
    description: 'The title of the video',
  })
  @IsNotEmpty()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Check out this amazing video!',
    description: 'The description of the video',
  })
  @IsNotEmpty()
  @IsString()
  description?: string;
}
