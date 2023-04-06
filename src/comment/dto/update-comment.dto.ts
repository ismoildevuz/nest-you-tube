import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'This is a great video!',
    description: 'The body of the comment',
  })
  @IsNotEmpty()
  @IsString()
  body?: string;
}
