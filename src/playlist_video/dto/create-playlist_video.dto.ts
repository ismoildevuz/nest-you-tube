import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaylistVideoDto {
  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6974',
    description: 'The ID of the playlist that the video will be added to',
  })
  @IsNotEmpty()
  @IsString()
  playlist_id: string;

  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6976',
    description: 'The ID of the video that will be added to the playlist',
  })
  @IsNotEmpty()
  @IsString()
  video_id: string;
}
