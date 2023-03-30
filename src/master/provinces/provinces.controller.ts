import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { provinces } from '../../../models/masterSchema';
import { CreateProvincesDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  async findAll(): Promise<provinces[]> {
    return this.provincesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<provinces> {
    return this.provincesService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createProvinceDto: CreateProvincesDto,
  ): Promise<provinces> {
    return await this.provincesService.create(createProvinceDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ): Promise<[number, provinces[]]> {
    return this.provincesService.update(+id, updateProvinceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.provincesService.remove(+id);
  }
}
