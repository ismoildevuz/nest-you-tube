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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './models/user.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { Subscription } from '../subscription/models/subscription.model';
import { LikedVideo } from '../liked_video/models/liked_video.model';
import { UserLikeDto } from './dto/user-like.dto';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserCommentDto } from './dto/user-comment.dto';
import { Comment } from '../comment/models/comment.model';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  async registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: 'Log out a user' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthActiveGuard)
  @Post('signout')
  async logout(
    @CookieGetter('access_token') accessToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.logout(accessToken, res);
  }

  @ApiOperation({ summary: 'Activate a user account' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  async activate(@Param('link') link: string) {
    return this.userService.activate(link);
  }

  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({ status: 201, type: Subscription })
  @UseGuards(JwtAuthActiveGuard)
  @Post('subscribe')
  async subscribe(
    @CookieGetter('access_token') accessToken: string,
    @Body() create: UserSubscribeDto,
  ) {
    return this.userService.subscribe(accessToken, create.channel_id);
  }

  @ApiOperation({ summary: 'Create a new liked video' })
  @ApiResponse({ status: 201, type: LikedVideo })
  @UseGuards(JwtAuthActiveGuard)
  @Post('like')
  async like(
    @CookieGetter('access_token') accessToken: string,
    @Body() create: UserLikeDto,
  ) {
    return this.userService.like(accessToken, create.video_id);
  }

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, type: Comment })
  @UseGuards(JwtAuthActiveGuard)
  @Post('comment')
  async comment(
    @CookieGetter('access_token') accessToken: string,
    @Body() create: UserCommentDto,
  ) {
    return this.userService.comment(accessToken, create.video_id, create.body);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(
    @CookieGetter('access_token') accessToken: string,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, accessToken, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(
    @CookieGetter('access_token') accessToken: string,
    @Param('id') id: string,
  ) {
    return this.userService.remove(id, accessToken);
  }
}
