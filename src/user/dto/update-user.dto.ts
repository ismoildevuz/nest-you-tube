import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: "The user's full name" })
  @IsNotEmpty()
  @IsString()
  fullname?: string;

  @ApiProperty({ example: 'john77', description: "The user's username" })
  @IsNotEmpty()
  @IsString()
  username?: string;
}
