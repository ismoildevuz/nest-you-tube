import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaylistVideoDto } from './dto/create-playlist_video.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PlaylistVideo } from './models/playlist_video.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class PlaylistVideoService {
  constructor(
    @InjectModel(PlaylistVideo)
    private playlistVideoRepository: typeof PlaylistVideo,
  ) {}

  async create(createPlaylistVideoDto: CreatePlaylistVideoDto) {
    return this.playlistVideoRepository.create({
      id: uuidv4(),
      ...createPlaylistVideoDto,
    });
  }

  async findAll() {
    return this.playlistVideoRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const playlistVideo = await this.playlistVideoRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!playlistVideo) {
      throw new HttpException('Playlist Video not found', HttpStatus.NOT_FOUND);
    }
    return playlistVideo;
  }

  async remove(id: string) {
    const playlistVideo = await this.findOne(id);
    const deletedPlaylistVideo = await this.playlistVideoRepository.destroy({
      where: { id },
    });
    return { message: 'Playlist Video deleted' };
  }
}
