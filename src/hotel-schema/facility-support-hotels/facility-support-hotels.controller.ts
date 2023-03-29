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
import { FacilitySupportHotelsService } from './facility-support-hotels.service';
import { CreateFacilitySupportHotelDto } from './dto/create-facility-support-hotel.dto';
import { UpdateFacilitySupportHotelDto } from './dto/update-facility-support-hotel.dto';

@Controller('facility-support-hotels')
export class FacilitySupportHotelsController {
  constructor(
    private readonly facilitySupportHotelsService: FacilitySupportHotelsService,
  ) {}

  @Post()
  create(@Body() createFacilitySupportHotelDto: CreateFacilitySupportHotelDto) {
    return this.facilitySupportHotelsService.create(
      createFacilitySupportHotelDto,
    );
  }

  @Get()
  findAll() {
    return this.facilitySupportHotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facilitySupportHotelsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateFacilitySupportHotelDto: UpdateFacilitySupportHotelDto,
  ) {
    return this.facilitySupportHotelsService.update(
      id,
      updateFacilitySupportHotelDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.facilitySupportHotelsService.remove(id);
  }
}
