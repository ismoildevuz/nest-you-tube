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
  UseGuards,
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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { ActivateVideoDto } from './dto/activate-video.dto';
import { AdminCreatorGuard } from '../guards/admin-creator.guard';
import { ActivateChannelDto } from './dto/activate-channel.dto';
import { ActivateCommentDto } from './dto/activate-comment.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

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
  @UseGuards(JwtAuthActiveGuard)
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
  @UseGuards(JwtAuthGuard)
  @Post('otp/new')
  async newOtp(@Body() phoneAdminDto: PhoneAdminDto) {
    return this.adminService.newOtp(phoneAdminDto);
  }

  @ApiOperation({ summary: 'Verify OTP for admin' })
  @UseGuards(JwtAuthGuard)
  @Post('otp/verify')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.adminService.verifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: 'Activate the video' })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('video/activate')
  async avtivateVideo(@Body() activateVideoDto: ActivateVideoDto) {
    return this.adminService.avtivateVideo(activateVideoDto);
  }

  @ApiOperation({ summary: 'Activate the video' })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('video/deactivate')
  async deavtivateVideo(@Body() activateVideoDto: ActivateVideoDto) {
    return this.adminService.deavtivateVideo(activateVideoDto);
  }

  @ApiOperation({ summary: 'Activate the channel' })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('channel/activate')
  async avtivateChannel(@Body() activateChannelDto: ActivateChannelDto) {
    return this.adminService.avtivateChannel(activateChannelDto);
  }

  @ApiOperation({ summary: 'Activate the channel' })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('channel/deactivate')
  async deavtivateChannel(@Body() activateChannelDto: ActivateChannelDto) {
    return this.adminService.deavtivateChannel(activateChannelDto);
  }

  @ApiOperation({ summary: 'Activate the comment' })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('comment/activate')
  async avtivateComment(@Body() activateCommentDto: ActivateCommentDto) {
    return this.adminService.avtivateComment(activateCommentDto);
  }

  @ApiOperation({ summary: 'Activate the comment' })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('comment/deactivate')
  async deavtivateComment(@Body() activateCommentDto: ActivateCommentDto) {
    return this.adminService.deavtivateComment(activateCommentDto);
  }

  @ApiOperation({ summary: 'Activate the user' })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('user/activate')
  async avtivateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.adminService.avtivateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Activate the user' })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('user/deactivate')
  async deavtivateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.adminService.deavtivateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete an admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
