import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
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
  password: string;
}
