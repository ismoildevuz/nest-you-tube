import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private subscriptionRepository: typeof Subscription,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.create({
      id: uuidv4(),
      ...createSubscriptionDto,
    });
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
}
