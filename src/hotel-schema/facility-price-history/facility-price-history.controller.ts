import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { FacilityPriceHistoryService } from './facility-price-history.service';
import { CreateFacilityPriceHistoryDto } from './dto/create-facility-price-history.dto';
import { UpdateFacilityPriceHistoryDto } from './dto/update-facility-price-history.dto';
import { Response } from 'express';

@Controller('facility-price-history')
export class FacilityPriceHistoryController {
  constructor(
    private readonly facilityPriceHistoryService: FacilityPriceHistoryService,
  ) {}

  @Post()
  create(@Body() createFacilityPriceHistoryDto: CreateFacilityPriceHistoryDto) {
    return this.facilityPriceHistoryService.create(
      createFacilityPriceHistoryDto,
    );
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.facilityPriceHistoryService.findAll(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityPriceHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityPriceHistoryDto: UpdateFacilityPriceHistoryDto,
  ) {
    return this.facilityPriceHistoryService.update(
      +id,
      updateFacilityPriceHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.facilityPriceHistoryService.remove(response, id);
  }
}
