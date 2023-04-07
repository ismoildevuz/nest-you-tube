import { Module, forwardRef } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from './models/video.model';
import { JwtModule } from '@nestjs/jwt';
import { Channel } from '../channel/models/channel.model';
import { User } from '../user/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Video, Channel, User]),
    JwtModule.register({}),
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
