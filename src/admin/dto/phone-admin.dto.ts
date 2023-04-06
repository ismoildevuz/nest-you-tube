import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class PhoneAdminDto {
  @ApiProperty({
    example: '+998991234567',
    description: 'The new phone number for the admin',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;
}
