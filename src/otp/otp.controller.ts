import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('verify')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.otpService.verifyOtp(verifyOtpDto);
  }

  @Get()
  async findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.otpService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.otpService.remove(id);
  }
}
