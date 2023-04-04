import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Location } from './models/location.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location) private locationRepository: typeof Location,
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    const { country } = createLocationDto;
    const location = await this.getByCountry(country);
    if (location) {
      throw new BadRequestException('Country already exists');
    }
    return this.locationRepository.create({ id: uuidv4(), country });
  }

  async findAll() {
    return this.locationRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const location = await this.locationRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!location) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }
    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const location = await this.findOne(id);
    const updatedLocation = await this.locationRepository.update(
      updateLocationDto,
      {
        where: { id },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async remove(id: string) {
    const location = await this.findOne(id);
    const deletedLocation = await this.locationRepository.destroy({
      where: { id },
    });
    return { message: 'Location deleted' };
  }

  async getByCountry(country: string) {
    return this.locationRepository.findOne({ where: { country } });
  }
}
