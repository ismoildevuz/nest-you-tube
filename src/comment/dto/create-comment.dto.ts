import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6977',
    description: 'The ID of the user who created the comment',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6976',
    description: 'The ID of the video the comment belongs to',
  })
  @IsNotEmpty()
  @IsString()
  video_id: string;

  @ApiProperty({
    example: 'This is a great video!',
    description: 'The body of the comment',
  })
  @IsNotEmpty()
  @IsString()
  body: string;
}
