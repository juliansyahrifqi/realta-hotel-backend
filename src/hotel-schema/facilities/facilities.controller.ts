import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { Put, Res } from '@nestjs/common/decorators';
import { Response } from 'express';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post()
  create(
    @Res() response: Response,
    @Body() createFacilityDto: CreateFacilityDto,
  ) {
    return this.facilitiesService.create(response, createFacilityDto);
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.facilitiesService.findAll(response);
  }
  @Get('facility-price-history')
  findAllIncludePriceHistory(@Res() response: Response) {
    return this.facilitiesService.findAllIncludePriceHistory(response);
  }
  @Get('facility-photos')
  findAllIncludePhotos(@Res() response: Response) {
    return this.facilitiesService.findAllIncludePhotos(response);
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: number) {
    return this.facilitiesService.findOne(response, id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() updateFacilityDto: UpdateFacilityDto,
  ) {
    return this.facilitiesService.update(response, id, updateFacilityDto);
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.facilitiesService.remove(response, id);
  }
}
