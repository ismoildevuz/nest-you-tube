import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: "User's fullname" })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'john77', description: "User's username" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'john77@gmail.com',
    description: "User's email",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: "User's password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;
}
