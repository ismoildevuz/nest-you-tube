import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikedVideoDto } from './dto/create-liked_video.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LikedVideo } from './models/liked_video.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class LikedVideoService {
  constructor(
    @InjectModel(LikedVideo) private likedVideoRepository: typeof LikedVideo,
  ) {}

  async create(createLikedVideoDto: CreateLikedVideoDto) {
    return this.likedVideoRepository.create({
      id: uuidv4(),
      ...createLikedVideoDto,
    });
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

  async remove(id: string) {
    const likedVideo = await this.findOne(id);
    const deletedLikedVideo = await this.likedVideoRepository.destroy({
      where: { id },
    });
    return { message: 'Liked Video deleted' };
  }
}
