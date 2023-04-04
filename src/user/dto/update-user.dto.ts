import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: "User's fullname" })
  @IsNotEmpty()
  @IsString()
  fullname?: string;

  @ApiProperty({ example: 'john77', description: "User's username" })
  @IsNotEmpty()
  @IsString()
  username?: string;
}
