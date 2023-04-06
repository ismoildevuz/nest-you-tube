import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Subscription } from './models/subscription.model';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({ status: 201, type: Subscription })
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiResponse({ status: 200, type: [Subscription] })
  async findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subscription by ID' })
  @ApiResponse({ status: 200, type: Subscription })
  async findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subscription by ID' })
  @ApiResponse({ status: 200, type: Subscription })
  async remove(@Param('id') id: string) {
    return this.subscriptionService.remove(id);
  }
}
