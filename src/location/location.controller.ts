import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Location } from './models/location.model';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { AdminCreatorGuard } from '../guards/admin-creator.guard';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, type: Location })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, type: [Location] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.locationService.findAll();
  }

  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiResponse({ status: 200, type: Location })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiResponse({ status: 200, type: Location })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiResponse({ status: 200, type: Location })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
