import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Location } from './models/location.model';

@Module({
  imports: [SequelizeModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
