import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Video } from './models/video.model';
import { v4 as uuidv4, v4 } from 'uuid';
import { ChannelService } from './../channel/channel.service';
import { Channel } from '../channel/models/channel.model';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private videoRepository: typeof Video,
    @InjectModel(Channel) private channelRepository: typeof Channel,
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async create(refreshToken: string, createVideoDto: CreateVideoDto) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const userExist = await this.userRepository.findOne({
      where: { id: user.id, is_active: true },
      include: { all: true },
    });
    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { channel_id } = createVideoDto;
    const channel = await this.channelRepository.findOne({
      where: { id: channel_id, is_active: true },
      include: { all: true },
    });
    if (!channel) {
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    }
    if (user.id != channel.user_id) {
      throw new HttpException(
        'Channel does not belong to this user',
        HttpStatus.BAD_REQUEST,
      );
    }
    const video = await this.videoRepository.create({
      id: uuidv4(),
      ...createVideoDto,
    });
    const videos = await this.videoRepository.findAll({
      where: { channel_id, is_active: true },
    });
    await this.channelRepository.update(
      { videos: videos.length },
      {
        where: { id: channel_id, is_active: true },
        returning: true,
      },
    );
    return video;
  }

  async findAll() {
    return this.videoRepository.findAll({
      where: { is_active: true },
      include: { all: true },
    });
  }

  async getOne(id: string) {
    const video = await this.findOne(id);
    const channel = await this.channelRepository.findOne({
      where: { id: video.channel_id, is_active: true },
      include: { all: true },
    });
    if (!channel) {
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    }
    await this.updateViews(video.id, Number(video.views) + 1);
    await this.channelRepository.update(
      { views: Number(channel.views) + 1 },
      {
        where: { id: channel.id, is_active: true },
        returning: true,
      },
    );
    return video;
  }

  async findOne(id: string) {
    const video = await this.videoRepository.findOne({
      where: { id, is_active: true },
      include: { all: true },
    });
    if (!video) {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
    return video;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const video = await this.findOne(id);
    const updatedVideo = await this.videoRepository.update(updateVideoDto, {
      where: { id, is_active: true },
      returning: true,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const video = await this.findOne(id);
    const deletedVideo = await this.videoRepository.destroy({
      where: { id, is_active: true },
    });
    return { message: 'Video deleted' };
  }

  async getVideoById(id: string) {
    const video = await this.videoRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!video) {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
    return video;
  }

  async updateLikes(id: string, likes: number) {
    const video = await this.findOne(id);
    const updatedVideo = await this.videoRepository.update(
      { likes },
      {
        where: { id, is_active: true },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async updateViews(id: string, views: number) {
    const video = await this.findOne(id);
    const updatedVideo = await this.videoRepository.update(
      { views },
      {
        where: { id, is_active: true },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async updateIsActive(id: string, is_active: boolean) {
    const video = await this.getVideoById(id);
    const updatedVideo = await this.videoRepository.update(
      { is_active },
      {
        where: { id },
        returning: true,
      },
    );
    return this.getVideoById(id);
  }
}
