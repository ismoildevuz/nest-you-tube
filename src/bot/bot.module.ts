import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { Bot } from './models/bot.model';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([Bot]), JwtModule.register({})],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
