import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Admin } from './models/admin.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { PhoneAdminDto } from './dto/phone-admin.dto';
import { VerifyOtpDto } from '../otp/dto/verify-otp.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Register a new admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  async registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Log in an admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Log out an admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Activate an admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  async activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @ApiOperation({ summary: 'Generate new OTP for admin' })
  @Post('otp/new')
  async newOtp(@Body() phoneAdminDto: PhoneAdminDto) {
    return this.adminService.newOtp(phoneAdminDto);
  }

  @ApiOperation({ summary: 'Verify OTP for admin' })
  @Post('otp/verify')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.adminService.verifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete an admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
