import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { User } from './user/models/user.model';
import { ChannelModule } from './channel/channel.module';
import { LocationModule } from './location/location.module';
import { SocialMediaLinkModule } from './social_media_link/social_media_link.module';
import { Channel } from './channel/models/channel.model';
import { Location } from './location/models/location.model';
import { SocialMediaLink } from './social_media_link/models/social_media_link.model';
import { VideoModule } from './video/video.module';
import { Video } from './video/models/video.model';
import { LikedVideoModule } from './liked_video/liked_video.module';
import { LikedVideo } from './liked_video/models/liked_video.model';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/models/comment.model';
import { PlaylistModule } from './playlist/playlist.module';
import { Playlist } from './playlist/models/playlist.model';
import { PlaylistVideoModule } from './playlist_video/playlist_video.module';
import { PlaylistVideo } from './playlist_video/models/playlist_video.model';
import { SubscriptionModule } from './subscription/subscription.module';
import { Subscription } from './subscription/models/subscription.model';
import { AdminModule } from './admin/admin.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constant';
import { BotModule } from './bot/bot.module';
import { OtpModule } from './otp/otp.module';
import { Admin } from './admin/models/admin.model';
import { Otp } from './otp/models/otp.model';
import { Bot } from './bot/models/bot.model';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Channel,
        Location,
        SocialMediaLink,
        Video,
        LikedVideo,
        Comment,
        Playlist,
        PlaylistVideo,
        Subscription,
        Admin,
        Otp,
        Bot,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    UserModule,
    MailModule,
    ChannelModule,
    LocationModule,
    SocialMediaLinkModule,
    VideoModule,
    LikedVideoModule,
    CommentModule,
    PlaylistModule,
    PlaylistVideoModule,
    SubscriptionModule,
    AdminModule,
    OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
