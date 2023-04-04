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

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel) private channelRepository: typeof Channel,
  ) {}

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
    return this.channelRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const channel = await this.channelRepository.findOne({
      where: { id },
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
        where: { id },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async remove(id: string) {
    const channel = await this.findOne(id);
    const deletedChannel = await this.channelRepository.destroy({
      where: { id },
    });
    return { message: 'Channel deleted' };
  }

  async getByUserId(user_id: string) {
    return this.channelRepository.findOne({ where: { user_id } });
  }
}
