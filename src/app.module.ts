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

@Module({
  imports: [
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
      models: [User, Channel, Location, SocialMediaLink],
      autoLoadModels: true,
      logging: false,
    }),
    UserModule,
    MailModule,
    ChannelModule,
    LocationModule,
    SocialMediaLinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
