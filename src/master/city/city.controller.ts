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

  @Get('search')
  async findAllSearch(@Query('searchQuery') searchQuery: string): Promise<any> {
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

  @Get('/city/:id')
  async getProvinceByRegion(@Param('id') id: number) {
    const city = await this.citiesService.getAddressById(id);
    return { data: city };
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
    return await this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return await this.citiesService.remove(id);
  }
}
