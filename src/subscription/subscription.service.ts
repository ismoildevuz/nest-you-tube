import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';
import { v4 as uuidv4, v4 } from 'uuid';
import { ChannelService } from '../channel/channel.service';
import { User } from '../user/models/user.model';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private subscriptionRepository: typeof Subscription,
    @InjectModel(User) private userRepository: typeof User,
    private readonly channelService: ChannelService,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const { user_id, channel_id } = createSubscriptionDto;
    const user = await this.userRepository.findOne({
      where: { id: user_id, is_active: true },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const subscription = await this.getByUserIdAndChannelId(
      user_id,
      channel_id,
    );
    const channel = await this.channelService.findOne(channel_id);
    if (subscription) {
      await this.remove(subscription.id);
      await this.channelService.updateFollowers(
        channel_id,
        Number(channel.followers) - 1,
      );
      return { message: 'Subscription canceled' };
    }
    const newSubscription = await this.subscriptionRepository.create({
      id: uuidv4(),
      ...createSubscriptionDto,
    });
    const followers = await this.subscriptionRepository.findAll({
      where: { channel_id },
    });
    await this.channelService.updateFollowers(channel_id, followers.length);
    return { message: 'Subscribed to channel' };
  }

  async findAll() {
    return this.subscriptionRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!subscription) {
      throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
    }
    return subscription;
  }

  async remove(id: string) {
    const subscription = await this.findOne(id);
    const deletedSubscription = await this.subscriptionRepository.destroy({
      where: { id },
    });
    return { message: 'Subscription deleted' };
  }

  async getByUserIdAndChannelId(user_id: string, channel_id: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user_id, channel_id },
    });
    return subscription;
  }
}
