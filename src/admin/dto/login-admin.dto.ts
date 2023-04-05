import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'john77@gmail.com',
    description: "Admin's email",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: "Admin's password" })
  @IsNotEmpty()
  @IsString()
  password: string;
}
