import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Otp } from './models/otp.model';
import { VerifyOtpResponseDto } from './dto/verify-otp-response.dto';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminCreatorGuard } from '../guards/admin-creator.guard';

@ApiTags('Otp')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'Verify OTP' })
  @ApiResponse({ status: 200, type: VerifyOtpResponseDto })
  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.otpService.verifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: 'Get all OTPs' })
  @ApiResponse({ status: 200, type: [Otp] })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.otpService.findAll();
  }

  @ApiOperation({ summary: 'Get OTP by ID' })
  @ApiResponse({ status: 200, type: Otp })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.otpService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete OTP by ID' })
  @ApiResponse({ status: 200, type: Otp })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.otpService.remove(id);
  }
}
