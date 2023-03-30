import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
// import { RegionsDto } from './dto/';
import { RegionsService } from './regions.service';
import { regions } from '../../../models/masterSchema';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  async findAll(): Promise<regions[]> {
    return this.regionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<regions> {
    return this.regionsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateRegionDto): Promise<any> {
    return this.regionsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateRegionDto,
  ): Promise<regions> {
    return this.regionsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.regionsService.delete(id);
  }
}
