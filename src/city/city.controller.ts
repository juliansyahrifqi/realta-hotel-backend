import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CityService } from './city.service';
// import { city } from '../../models/master_module';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly citiesService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<any> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.citiesService.findAll();
  }

  @Get()
  async findAllSearch(@Query('searchQuery') searchQuery: string) {
    try {
      const city = await this.citiesService.findAllSearch(searchQuery);
      return {
        data: city,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Internal server error',
      };
    }
  }

  // @Get(':name')
  // async findByCityName(@Param('name') cityName: string): Promise<any> {
  //   return this.citiesService.findByName(cityName);
  // }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.citiesService.findOne(id);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateCityDto: UpdateCityDto,
  // ): Promise<[number, city[]]> {
  //   return this.citiesService.update(id, updateCityDto);
  // }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<any> {
    await this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.citiesService.remove(id);
  }
}
