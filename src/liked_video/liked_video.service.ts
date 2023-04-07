import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikedVideoDto } from './dto/create-liked_video.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LikedVideo } from './models/liked_video.model';
import { v4 as uuidv4, v4 } from 'uuid';
import { VideoService } from './../video/video.service';
import { User } from '../user/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LikedVideoService {
  constructor(
    @InjectModel(LikedVideo) private likedVideoRepository: typeof LikedVideo,
    @InjectModel(User) private userRepository: typeof User,
    private readonly videoService: VideoService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createLikedVideoDto: CreateLikedVideoDto, accessToken: string) {
    const { user_id, video_id } = createLikedVideoDto;
    const like = await this.getByUserIdAndVideoId(user_id, video_id);
    const user = await this.findUser(user_id)
    const video = await this.videoService.findOne(video_id);
    if (like) {
      await this.remove(like.id, accessToken);
      await this.videoService.updateLikes(video.id, Number(video.likes) - 1);
      return { message: 'Like canceled' };
    }
    const newlike = await this.likedVideoRepository.create({
      id: uuidv4(),
      ...createLikedVideoDto,
    });
    await this.videoService.updateLikes(video.id, Number(video.likes) + 1);
    return { message: 'Liked video' };
  }

  async findAll() {
    return this.likedVideoRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const likedVideo = await this.likedVideoRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!likedVideo) {
      throw new HttpException('Liked Video not found', HttpStatus.NOT_FOUND);
    }
    return likedVideo;
  }

  async remove(id: string, accessToken: string) {
    const likedVideo = await this.findOne(id);
    const user = await this.isOwner(likedVideo.user_id, accessToken);
    const deletedLikedVideo = await this.likedVideoRepository.destroy({
      where: { id },
    });
    return { message: 'Liked Video deleted' };
  }

  async isOwner(user_id: string, accessToken: string) {
    const user = await this.jwtService.verify(accessToken, {
      secret: process.env.ACCESS_TOKEN_KEY,
    });
    const userExist = await this.findUser(user.id);
    if (userExist.id != user_id) {
      throw new HttpException(
        'You do not have permission to do this',
        HttpStatus.BAD_REQUEST,
      );
    }
    return userExist;
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, is_active: true },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getByUserIdAndVideoId(user_id: string, video_id: string) {
    const subscription = await this.likedVideoRepository.findOne({
      where: { user_id, video_id },
    });
    return subscription;
  }
}
