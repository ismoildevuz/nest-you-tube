import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from './models/channel.model';

@Module({
  imports:[SequelizeModule.forFeature([Channel])],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService]
})
export class ChannelModule {}
