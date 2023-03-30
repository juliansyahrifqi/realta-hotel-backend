import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { HotelReviewsService } from './hotel-reviews.service';
import { CreateHotelReviewDto } from './dto/create-hotel-review.dto';
import { UpdateHotelReviewDto } from './dto/update-hotel-review.dto';
import { Response } from 'express';

@Controller('hotel-reviews')
export class HotelReviewsController {
  constructor(private readonly hotelReviewsService: HotelReviewsService) {}

  @Post()
  create(
    @Res() response: Response,
    @Body() createHotelReviewDto: CreateHotelReviewDto,
  ) {
    return this.hotelReviewsService.create(response, createHotelReviewDto);
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.hotelReviewsService.findAll(response);
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: number) {
    return this.hotelReviewsService.findOne(response, id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() updateHotelReviewDto: UpdateHotelReviewDto,
  ) {
    return this.hotelReviewsService.update(response, id, updateHotelReviewDto);
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.hotelReviewsService.remove(response, id);
  }
}
