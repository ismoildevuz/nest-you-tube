import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpResponseDto {
  @ApiProperty({
    description: 'A message indicating the result of the OTP verification',
    example: 'Admin verified successfully',
  })
  message: string;

  @ApiProperty({
    description:
      'A boolean indicating whether the OTP verification was successful',
    example: true,
  })
  success: boolean;
}
