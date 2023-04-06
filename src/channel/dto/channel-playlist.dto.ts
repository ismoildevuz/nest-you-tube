import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChannelPlaylistDto {
  @ApiProperty({
    example: 'My Favorite Songs',
    description: 'The name of the new playlist',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
