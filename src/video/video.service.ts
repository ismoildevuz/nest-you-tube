import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Video } from './models/video.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video) private videoRepository: typeof Video) {}
  async create(createVideoDto: CreateVideoDto) {
    return this.videoRepository.create({
      id: uuidv4(),
      ...createVideoDto,
    });
  }

  async findAll() {
    return this.videoRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const Video = await this.videoRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!Video) {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }
    return Video;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const Video = await this.findOne(id);
    const updatedVideo = await this.videoRepository.update(updateVideoDto, {
      where: { id },
      returning: true,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const Video = await this.findOne(id);
    const deletedVideo = await this.videoRepository.destroy({ where: { id } });
    return { message: 'Video deleted' };
  }
}
