import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: '1234',
    description: 'The OTP code received by the user',
  })
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number to be checked',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  check: string;

  @ApiProperty({
    example: 'abc123',
    description: 'The verification key associated with the OTP',
  })
  @IsNotEmpty()
  @IsString()
  verification_key: string;
}
