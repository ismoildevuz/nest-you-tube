import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'john77@example.com',
    description: "The admin's email address",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: "The admin's password",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
