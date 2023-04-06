import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4, v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SubscriptionService } from '../subscription/subscription.service';
import { LikedVideoService } from './../liked_video/liked_video.service';
import { CommentService } from './../comment/comment.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly subscriptionService: SubscriptionService,
    private readonly likedVideoService: LikedVideoService,
    private readonly commentService: CommentService,
  ) {}

  async registration(createUserDto: CreateUserDto, res: Response) {
    const email = await this.getUserByEmail(createUserDto.email);
    const username = await this.getUserByUsername(createUserDto.username);
    if (email) {
      throw new BadRequestException('Email already registered!');
    }
    if (username) {
      throw new BadRequestException('Username already exists!');
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepository.create({
      id: uuidv4(),
      ...createUserDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedUser = await this.userRepository.update(
      {
        hashed_refresh_token,
        activation_link: uniqueKey,
      },
      {
        where: { id: newUser.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await this.mailService.sendUserConfirmation(updatedUser[1][0]);
    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not registered');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('User not registered(pass)');
    }
    if (!user.is_active) {
      throw new UnauthorizedException('User not activated');
    }
    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.userRepository.update(
      {
        hashed_refresh_token,
      },
      {
        where: { id: user.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not found');
    }
    const updateUser = await this.userRepository.update(
      { hashed_refresh_token: null },
      { where: { id: userData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user: updateUser[1][0],
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is expired');
    }
    const updatedUser = await this.userRepository.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updatedUser[1][0]) {
      throw new BadRequestException('User already activated');
    }
    const response = {
      message: 'User activated successfully',
      user: updatedUser[1][0],
    };
    return response;
  }

  async subscribe(refreshToken: string, channel_id: string) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    return this.subscriptionService.create({ user_id: user.id, channel_id });
  }

  async like(refreshToken: string, video_id: string) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    return this.likedVideoService.create({ user_id: user.id, video_id });
  }

  async comment(refreshToken: string, video_id: string, body: string) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    return this.commentService.create({ user_id: user.id, video_id, body });
  }

  async findAll() {
    return this.userRepository.findAll({
      where: { is_active: true },
      include: { all: true },
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, is_active: true },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const username = await this.getUserByUsername(updateUserDto.username);
    if (username) {
      if (username.id != user.id) {
        throw new BadRequestException('Username already taken by someone!');
      }
    }
    const updatedUser = await this.userRepository.update(updateUserDto, {
      where: { id, is_active: true },
      returning: true,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    const deletedUser = await this.userRepository.destroy({
      where: { id, is_active: true },
    });
    return { message: 'User deleted' };
  }

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateIsActive(id: string, is_active: boolean) {
    const user = await this.getUserById(id);
    const updatedUser = await this.userRepository.update(
      { is_active },
      {
        where: { id },
        returning: true,
      },
    );
    return this.getUserById(id);
  }
}
