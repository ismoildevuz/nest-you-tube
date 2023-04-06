import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: "The user's full name" })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'john77', description: "The user's username" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'john77@gmail.com',
    description: "The user's email address",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description:
      "The user's password (must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character)",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;
}
