import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLikeDto {
  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6976',
    description: 'The ID of the video that was liked',
  })
  @IsNotEmpty()
  @IsString()
  video_id: string;
}
