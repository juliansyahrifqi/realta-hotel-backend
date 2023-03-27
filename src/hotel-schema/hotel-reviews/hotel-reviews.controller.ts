import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HotelReviewsService } from './hotel-reviews.service';
import { CreateHotelReviewDto } from './dto/create-hotel-review.dto';
import { UpdateHotelReviewDto } from './dto/update-hotel-review.dto';

@Controller('hotel-reviews')
export class HotelReviewsController {
  constructor(private readonly hotelReviewsService: HotelReviewsService) {}

  @Post()
  create(@Body() createHotelReviewDto: CreateHotelReviewDto) {
    return this.hotelReviewsService.create(createHotelReviewDto);
  }

  @Get()
  findAll() {
    return this.hotelReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelReviewsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateHotelReviewDto: UpdateHotelReviewDto,
  ) {
    return this.hotelReviewsService.update(id, updateHotelReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hotelReviewsService.remove(id);
  }
}
