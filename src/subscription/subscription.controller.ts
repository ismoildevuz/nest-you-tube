import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Subscription } from './models/subscription.model';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({ status: 201, type: Subscription })
  @UseGuards(JwtAuthActiveGuard)
  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiResponse({ status: 200, type: [Subscription] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.subscriptionService.findAll();
  }

  @ApiOperation({ summary: 'Get a subscription by ID' })
  @ApiResponse({ status: 200, type: Subscription })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a subscription by ID' })
  @ApiResponse({ status: 200, type: Subscription })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.subscriptionService.remove(id);
  }
}
