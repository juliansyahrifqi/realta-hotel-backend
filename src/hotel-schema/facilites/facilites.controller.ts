import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacilitesService } from './facilites.service';
import { CreateFaciliteDto } from './dto/create-facilite.dto';
import { UpdateFaciliteDto } from './dto/update-facilite.dto';

@Controller('facilites')
export class FacilitesController {
  constructor(private readonly facilitesService: FacilitesService) {}

  @Post()
  create(@Body() createFaciliteDto: CreateFaciliteDto) {
    return this.facilitesService.create(createFaciliteDto);
  }

  @Get()
  findAll() {
    return this.facilitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaciliteDto: UpdateFaciliteDto,
  ) {
    return this.facilitesService.update(+id, updateFaciliteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitesService.remove(+id);
  }
}
