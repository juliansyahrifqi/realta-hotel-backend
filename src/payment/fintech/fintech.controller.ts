import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { FintechService } from './fintech.service';
import { CreateFintechDto } from './dto/create-fintech.dto';
import { UpdateFintechDto } from './dto/update-fintech.dto';

@Controller('fintech')
export class FintechController {
  constructor(private readonly fintechService: FintechService) {}

  @Post()
  create(@Body() createFintechDto: CreateFintechDto) {
    const dataFintech= this.fintechService.create(createFintechDto)
    return dataFintech
  }

  @Get()
  async findAll(@Query('searchTerm') searchTerm?: string) {
    return this.fintechService.findAll(searchTerm);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateFintechDto: UpdateFintechDto) {
    return this.fintechService.update(+id, updateFintechDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fintechService.delete(+id);
  }
}
