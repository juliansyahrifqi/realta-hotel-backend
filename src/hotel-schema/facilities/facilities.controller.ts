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
import { Put } from '@nestjs/common/decorators';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto) {
    return this.facilitiesService.create(createFacilityDto);
  }

  @Get()
  findAll() {
    return this.facilitiesService.findAll();
  }
  @Get('facility-price-history')
  findAllIncludePriceHistory() {
    return this.facilitiesService.findAllIncludePriceHistory();
  }
  @Get('facility-photos')
  findAllIncludePhotos() {
    return this.facilitiesService.findAllIncludePhotos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
  ) {
    return this.facilitiesService.update(+id, updateFacilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.facilitiesService.remove(id);
  }
}
