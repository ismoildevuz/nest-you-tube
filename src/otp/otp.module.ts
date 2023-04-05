import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { JwtModule } from '@nestjs/jwt';
import { BotModule } from '../bot/bot.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';
import { Admin } from '../admin/models/admin.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Otp, Admin]),
    JwtModule.register({}),
    BotModule,
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
