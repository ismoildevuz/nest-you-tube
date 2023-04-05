import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class PhoneAdminDto {
  @ApiProperty({ example: '+998991234567' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;
}
