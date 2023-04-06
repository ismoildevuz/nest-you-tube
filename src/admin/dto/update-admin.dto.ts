import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'John Doe', description: "The admin's full name" })
  @IsNotEmpty()
  @IsString()
  fullname?: string;

  @ApiProperty({
    example: '+998991234567',
    description: "The admin's phone number in international format",
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number?: string;
}
