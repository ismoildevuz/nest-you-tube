import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { OtpModule } from '../otp/otp.module';
import { VideoModule } from '../video/video.module';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { ChannelModule } from '../channel/channel.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    JwtModule.register({}),
    MailModule,
    OtpModule,
    VideoModule,
    UserModule,
    CommentModule,
    ChannelModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
