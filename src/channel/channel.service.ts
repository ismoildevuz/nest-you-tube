import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './models/channel.model';
import { v4 as uuidv4, v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { PlaylistService } from '../playlist/playlist.service';
import { PlaylistVideoService } from './../playlist_video/playlist_video.service';
import { VideoService } from './../video/video.service';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel) private channelRepository: typeof Channel,
    private readonly jwtService: JwtService,
    private readonly playlistService: PlaylistService,
    private readonly playlistVideoService: PlaylistVideoService,
    private readonly videoService: VideoService,
  ) {}

  async playlist(refreshToken: string, name: string) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const channel = await this.getByUserId(user.id);
    if (!channel) {
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    }
    return this.playlistService.create({ channel_id: channel.id, name });
  }

  async addToPlaylist(
    refreshToken: string,
    playlist_id: string,
    video_id: string,
  ) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const channel = await this.getByUserId(user.id);
    if (!channel) {
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    }
    const playlist = await this.playlistService.findOne(playlist_id);
    const video = await this.videoService.findOne(video_id);
    return this.playlistVideoService.create({ playlist_id, video_id });
  }

  async create(createChannelDto: CreateChannelDto) {
    const { user_id } = createChannelDto;
    const channel = await this.getByUserId(user_id);
    if (channel) {
      throw new BadRequestException('User already created channel before');
    }
    const newChannel = await this.channelRepository.create({
      id: uuidv4(),
      ...createChannelDto,
    });
    return newChannel;
  }

  async findAll() {
    return this.channelRepository.findAll({
      where: { is_active: true },
      include: { all: true },
    });
  }

  async findOne(id: string) {
    const channel = await this.channelRepository.findOne({
      where: { id, is_active: true },
      include: { all: true },
    });
    if (!channel) {
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    }
    return channel;
  }

  async update(id: string, updateChannelDto: UpdateChannelDto) {
    const channel = await this.findOne(id);
    const updatedChannel = await this.channelRepository.update(
      updateChannelDto,
      {
        where: { id, is_active: true },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async remove(id: string) {
    const channel = await this.findOne(id);
    const deletedChannel = await this.channelRepository.destroy({
      where: { id, is_active: true },
    });
    return { message: 'Channel deleted' };
  }

  async getByUserId(user_id: string) {
    return this.channelRepository.findOne({ where: { user_id } });
  }

  async getChannelById(id: string) {
    const channel = await this.channelRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!channel) {
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    }
    return channel;
  }

  async updateFollowers(id: string, followers: number) {
    const channel = await this.findOne(id);
    const updatedChannel = await this.channelRepository.update(
      { followers },
      {
        where: { id, is_active: true },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async updateVideos(id: string, videos: number) {
    const channel = await this.findOne(id);
    const updatedChannel = await this.channelRepository.update(
      { videos },
      {
        where: { id, is_active: true },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async updateViews(id: string, views: number) {
    const channel = await this.findOne(id);
    const updatedChannel = await this.channelRepository.update(
      { views },
      {
        where: { id, is_active: true },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async updateIsActive(id: string, is_active: boolean) {
    const channel = await this.getChannelById(id);
    const updatedChannel = await this.channelRepository.update(
      { is_active },
      {
        where: { id },
        returning: true,
      },
    );
    return this.getChannelById(id);
  }
}
