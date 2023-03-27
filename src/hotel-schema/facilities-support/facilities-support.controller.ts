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
import { FacilitiesSupportService } from './facilities-support.service';
import { CreateFacilitiesSupportDto } from './dto/create-facilities-support.dto';
import { UpdateFacilitiesSupportDto } from './dto/update-facilities-support.dto';

@Controller('facilities-support')
export class FacilitiesSupportController {
  constructor(
    private readonly facilitiesSupportService: FacilitiesSupportService,
  ) {}

  @Post()
  create(@Body() createFacilitiesSupportDto: CreateFacilitiesSupportDto) {
    return this.facilitiesSupportService.create(createFacilitiesSupportDto);
  }

  @Get()
  findAll() {
    return this.facilitiesSupportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facilitiesSupportService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateFacilitiesSupportDto: UpdateFacilitiesSupportDto,
  ) {
    return this.facilitiesSupportService.update(id, updateFacilitiesSupportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesSupportService.remove(+id);
  }
}
