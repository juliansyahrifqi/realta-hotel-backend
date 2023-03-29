import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { hotels } from 'models/hotelSchema';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  async findAll(
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const hotels = await this.hotelsService.findAll(pageNumber, pageSize);
      return {
        data: hotels,
        Halaman: pageNumber,
        JmlhData: pageSize,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Internal server error',
      };
    }
  }
  @Get('search')
  async findAllSeacrh(@Query('searchQuery') searchQuery: string = '') {
    try {
      const hotels = await this.hotelsService.findAllSearch(searchQuery);
      return {
        data: hotels,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Internal server error',
      };
    }
  }
  @Get('hotel-reviews')
  findAllIncludeReviews() {
    return this.hotelsService.findAllIncludeReviews();
  }
  @Get('hotel-room')
  findAllIncludeRoom() {
    return this.hotelsService.findAllIncludeRoom();
  }
  @Get('hotel-address')
  findAllIncludeAddress() {
    return this.hotelsService.findAllIncludeAddress();
  }
  @Get('hotel-support')
  findAllIncludeSupport() {
    return this.hotelsService.findAllIncludeSupport();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(id, updateHotelDto);
  }
  @Put('switch-status/:id')
  updateStatus(
    @Param('id') id: number,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    return this.hotelsService.updateStatus(id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hotelsService.remove(id);
  }
}
