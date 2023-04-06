import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Location } from './models/location.model';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, type: Location })
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, type: [Location] })
  @Get()
  async findAll() {
    return this.locationService.findAll();
  }

  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiResponse({ status: 200, type: Location })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiResponse({ status: 200, type: Location })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiResponse({ status: 200, type: Location })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
