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
  Res,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { hotels } from 'models/hotelSchema';
import { Response } from 'express';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Res() response: Response, @Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(response, createHotelDto);
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const hotels = await this.hotelsService.findAll(
        response,
        pageNumber,
        pageSize,
      );
      return hotels;
    } catch (error) {
      return {
        message: 'Internal server error',
      };
    }
  }
  @Get('hotel-reviews')
  async findAllIncludeReviews(
    @Res() response: Response,
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const hotels = await this.hotelsService.findAllIncludeReviews(
        response,
        pageNumber,
        pageSize,
      );
      return hotels;
    } catch (error) {
      return {
        message: 'Internal server error',
      };
    }
  }
  @Get('hotel-room')
  async findAllIncludeRoom(
    @Res() response: Response,
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const hotels = await this.hotelsService.findAllIncludeRoom(
        response,
        pageNumber,
        pageSize,
      );
      return hotels;
    } catch (error) {
      return {
        message: 'Internal server error',
      };
    }
  }
  @Get('hotel-address')
  async findAllIncludeAddress(
    @Res() response: Response,
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const hotels = await this.hotelsService.findAllIncludeAddress(
        response,
        pageNumber,
        pageSize,
      );
      return hotels;
    } catch (error) {
      return {
        message: 'Internal server error',
      };
    }
  }
  @Get('hotel-support')
  async findAllIncludeSupport(
    @Res() response: Response,
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const hotels = await this.hotelsService.findAllIncludeSupport(
        response,
        pageNumber,
        pageSize,
      );
      return hotels;
    } catch (error) {
      return {
        message: 'Internal server error',
      };
    }
  }
  @Get('search')
  async findAllSeacrh(
    @Res() response: Response,
    @Query('searchQuery') searchQuery: string = '',
  ) {
    try {
      const hotels = await this.hotelsService.findAllSearch(
        response,
        searchQuery,
      );
      return {
        data: hotels,
      };
    } catch (error) {
      return {
        message: 'Internal server error',
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    return this.hotelsService.update(response, id, updateHotelDto);
  }
  @Put('switch-status/:id')
  updateStatus(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    return this.hotelsService.updateStatus(response, id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.hotelsService.remove(response, id);
  }
}