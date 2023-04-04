import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './models/playlist.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist) private playlistRepository: typeof Playlist,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistRepository.create({
      id: uuidv4(),
      ...createPlaylistDto,
    });
  }

  async findAll() {
    return this.playlistRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }
    return playlist;
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.findOne(id);
    const updatedPlaylist = await this.playlistRepository.update(
      updatePlaylistDto,
      {
        where: { id },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async remove(id: string) {
    const playlist = await this.findOne(id);
    const deletedPlaylist = await this.playlistRepository.destroy({
      where: { id },
    });
    return { message: 'Playlist deleted' };
  }
}
