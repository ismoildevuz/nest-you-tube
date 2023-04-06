import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe', description: "Admin's fullname" })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: '+998991234567',
    description: "Admin's phone number",
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

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
  @MinLength(6)
  @IsStrongPassword()
  password: string;
}
