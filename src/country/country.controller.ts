/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
//   import { CountryDto } from './dto/country.dto';
import { CountryService } from './country.service';
import { country } from '../../models/master_module';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(): Promise<any> {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<any> {
    return this.countryService.findOne(id);
  }

  @Post()
  create(@Body() countryDto: CreateCountryDto): Promise<any> {
    return this.countryService.create(countryDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() countryDto: UpdateCountryDto,
  ): Promise<any> {
    return this.countryService.update(id, countryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.countryService.delete(id);
  }
}
