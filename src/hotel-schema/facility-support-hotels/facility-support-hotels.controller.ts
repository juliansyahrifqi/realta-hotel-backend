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
import { FacilitySupportHotelsService } from './facility-support-hotels.service';
import { CreateFacilitySupportHotelDto } from './dto/create-facility-support-hotel.dto';
import { UpdateFacilitySupportHotelDto } from './dto/update-facility-support-hotel.dto';
import { Response } from 'express';

@Controller('facility-support-hotels')
export class FacilitySupportHotelsController {
  constructor(
    private readonly facilitySupportHotelsService: FacilitySupportHotelsService,
  ) {}

  @Post()
  create(
    @Res() response: Response,
    @Body() createFacilitySupportHotelDto: CreateFacilitySupportHotelDto,
  ) {
    return this.facilitySupportHotelsService.create(
      response,
      createFacilitySupportHotelDto,
    );
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.facilitySupportHotelsService.findAll(response);
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: number) {
    return this.facilitySupportHotelsService.findOne(response, id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() updateFacilitySupportHotelDto: UpdateFacilitySupportHotelDto,
  ) {
    return this.facilitySupportHotelsService.update(
      response,
      id,
      updateFacilitySupportHotelDto,
    );
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.facilitySupportHotelsService.remove(response, id);
  }
}
